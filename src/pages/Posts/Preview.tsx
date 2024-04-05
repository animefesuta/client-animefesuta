import { getComments, getPost, sendCommentWithId } from "@/api/post";
import { Comment, forumPost } from "@/api/post/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { dateFormatted } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const Preview: React.FC = () => {
  const { id } = useParams();
  const [forumPost, setForumPost] = useState<forumPost>();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<Comment[]>();
  const sendComment = () => {
    sendCommentWithId({
      commentContext: content,
      themeID: id!,
    }).then((res) => {
      if (res === true) {
        setContent("");
        toast({
          description: "评论成功",
        });
        getComments(id!).then((res) => {
          setComments(res);
        });
      } else {
        toast({
          description: "评论失败，请稍后再试",
        });
      }
    });
  };
  useEffect(() => {
    getPost(id!).then((res) => {
      setForumPost(res);
    });

    if (id)
      getComments(id).then((res) => {
        setComments(res);
      });
  }, [id]);
  return (
    (id && (
      <>
        <div className="bg-white px-16 py-3">
          <div className="text-3xl">{forumPost?.title}</div>
          <div className="flex gap-5 py-5">
            <div>主题：{forumPost?.theme}</div>
            <div>作者：{forumPost?.nickname}</div>
          </div>
          {forumPost?.content && (
            <div>
              <MarkdownPreview
                source={forumPost.content}
                style={{ padding: 16 }}
              />
            </div>
          )}
        </div>
        <div className="bg-white px-16 py-3 gap-3 flex flex-col">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">评论一下</Label>
            <Textarea
              placeholder="宫廷玉液酒，评论走一走。"
              id="message-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button className="w-[200px] self-end" onClick={sendComment}>
            提交
          </Button>
        </div>
        <div className="bg-white px-16 py-3 gap-3 flex flex-col">
          <Label htmlFor="message-2">全部评论：</Label>
          {comments?.map((item) => (
            <>
              <div className="flex gap-2" key={item.id}>
                <div
                  className="w-16 h-16 rounded-full bg-black bg-cover border-2 bg-center"
                  style={{
                    backgroundImage: `url(${
                      import.meta.env.VITE_MINIO_ENDPOINT
                    }/images${item.user_image})`,
                  }}
                ></div>
                <div>
                  <div className="flex gap-3 text-sm text-[#10101060]">
                    <div>{item.commentUserNickName}</div>
                    <div>{dateFormatted(item.createTime)}</div>
                  </div>
                  <div>{item.commentContext}</div>
                </div>
              </div>
              <Separator />
            </>
          ))}
        </div>
      </>
    )) || (
      <div className="h-[800px] flex justify-center items-center">无人区</div>
    )
  );
};

export default Preview;
