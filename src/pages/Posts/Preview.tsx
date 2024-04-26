import {
  getComments,
  getPost,
  likeCount,
  sendCommentWithId,
  shareCount,
} from "@/api/post";
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
import { FaEye, FaShare, FaThumbsUp } from "react-icons/fa";

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
  const handleLikeCount = () => {
    likeCount(id!).then((res) => {
      if (res === true) {
        toast({
          description: "感谢支持",
        });
      }
    });
  };
  const handleShareCount = () => {
    shareCount(id!).then((res) => {
      if (res === true) {
        navigator.clipboard.writeText(window.location.href);
        toast({
          description: "链接复制成功，快去分享给好朋友吧~",
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
        <div className="bg-white px-16 min-h-[80vh] py-3">
          <div className="flex gap-5 py-5 justify-between">
            <div className="flex gap-5 items-center">
              <div>
                主题：
                <span className="bg-black text-white px-2 py-1 rounded-md">
                  {forumPost?.theme}
                </span>
              </div>
              <div>
                作者：
                <span className="bg-black text-white px-2 py-1 rounded-md">
                  {forumPost?.nickname}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-end gap-3">
                <Button
                  className="flex justify-center items-center gap-2"
                  variant={"outline"}
                  onClick={handleLikeCount}
                >
                  <FaThumbsUp />
                  {(forumPost?.likeCount && forumPost.likeCount) || <></>}
                </Button>
                <Button
                  className="flex justify-center items-center gap-2"
                  variant={"outline"}
                  onClick={handleShareCount}
                >
                  <FaShare />
                  {(forumPost?.shareCount && forumPost.shareCount) || <></>}
                </Button>
              </div>
              <div className="text-sm text-[#999] flex gap-4">
                <div className="flex justify-center items-center gap-2">
                  <FaEye /> {forumPost?.clickCount}
                </div>
                {forumPost?.createTime && (
                  <div>发布于：{dateFormatted(forumPost.createTime)}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-3xl mb-3">{forumPost?.title}</div>
          {forumPost?.content && (
            <div>
              <MarkdownPreview source={forumPost.content} />
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
        {(comments?.length && (
          <div className="bg-white px-16 py-3 gap-3 flex flex-col">
            <Label htmlFor="message-2">全部评论：</Label>
            {comments.map((item) => (
              <>
                <div className="flex gap-2" key={item.id}>
                  <div
                    className="min-w-16 min-h-16 rounded-full bg-black bg-cover border-2 bg-center"
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
        )) || <></>}
      </>
    )) || (
      <div className="h-[800px] flex justify-center items-center">无人区</div>
    )
  );
};

export default Preview;
