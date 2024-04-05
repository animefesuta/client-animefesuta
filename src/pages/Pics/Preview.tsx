import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { dateFormatted } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { FaEye, FaShare, FaThumbsUp } from "react-icons/fa";
import { PostPics } from "@/api/pic/types";
import {
  getComments,
  getCos,
  likeCount,
  sendCommentWithId,
  shareCount,
} from "@/api/pic";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Comment } from "@/api/post/types";

const Preview: React.FC = () => {
  const { id } = useParams();
  const [postPics, setPostPics] = useState<PostPics>();
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
        toast({
          description: "分享成功",
        });
      }
    });
  };
  useEffect(() => {
    getCos(id!).then((res) => {
      setPostPics(res);
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
          <div className="text-3xl">{postPics?.title}</div>
          <div className="flex gap-5 py-5 justify-between">
            <div>
              <div>主题：{postPics?.theme}</div>
              <div>作者：{postPics?.nickName}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-end gap-3">
                <Button
                  className="flex justify-center items-center gap-2"
                  variant={"outline"}
                  onClick={handleLikeCount}
                >
                  <FaThumbsUp />
                  {(postPics?.likeCount && postPics.likeCount) || <></>}
                </Button>
                <Button
                  className="flex justify-center items-center gap-2"
                  variant={"outline"}
                  onClick={handleShareCount}
                >
                  <FaShare />
                  {(postPics?.shareCount && postPics.shareCount) || <></>}
                </Button>
              </div>
              <div className="text-sm text-[#999] flex gap-4">
                <div className="flex justify-center items-center gap-2">
                  <FaEye /> {postPics?.clickCount}
                </div>
                {postPics?.createTime && (
                  <div>发布于：{dateFormatted(postPics.createTime)}</div>
                )}
              </div>
            </div>
          </div>
          <Carousel
            className="w-full h-full"
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {postPics?.image.map((item) => {
                return (
                  <CarouselItem
                    key={item}
                    className="w-full h-full flex justify-center items-center"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={`${
                        import.meta.env.VITE_MINIO_ENDPOINT
                      }/images${item}`}
                      alt="pic"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
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
