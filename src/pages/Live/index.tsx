import MuxPlayer from "@mux/mux-player-react";
import { MdLiveTv } from "react-icons/md";
import { LiveCard } from "./_components/LiveCard";
import { getLatestPlaybackId } from "@/api/live";
import { useEffect, useState } from "react";
export default function Live() {
  const [newPlay, setNewPlay] = useState<string>();
  /* const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "摄像头、录音机未授权或不可用，请检查并允许对应权限。",
        });
        console.log(err);
      });
  }, [toast]); */
  useEffect(() => {
    getLatestPlaybackId().then((res) => {
      setNewPlay(res.id);
    });
  }, []);
  return (
    <div className="px-20 py-2">
      {/* <div className="flex justify-center pb-30">
        <video
          ref={videoRef}
          autoPlay
          className="w-[1200px] h-[680px] bg-black my-6 mb-24"
        ></video>
      </div> */}
      <div className="text-sky-400 flex items-center gap-1 my-3">
        <MdLiveTv size={30} />
        <span className="pt-1">新开播</span>
      </div>
      <div className="flex justify-center">
        <MuxPlayer
          playbackId={newPlay}
          className="w-full h-[480px]"
          poster="/elysia_1.jpg"
        />
      </div>
      <div className="my-6">
        <div className="text-pink-400 flex items-center gap-1 my-3">
          <MdLiveTv size={30} />
          <span className="pt-1">官方直播</span>
        </div>
        <div>
          <LiveCard
            liveId="123153642644523"
            liveTitle="官方直播官方直播官方直播官方直播官方直播官方直播官方直播官方直播官方直播官方直播"
            liveAuthor="萤火虫23"
            liveImage="/elysia_1.jpg"
          />
        </div>
      </div>
      <div className="my-6">
        <div className="text-orange-400 flex items-center gap-1 my-3">
          <MdLiveTv size={30} />
          <span className="pt-1">正在直播</span>
        </div>
        <div>
          <LiveCard
            liveId="123153642644523"
            liveTitle="官方直播官方直播官方直播官方直播官方直播官方直播官方直播官方直播官方直播官方直播"
            liveAuthor="萤火虫23"
            liveImage="/elysia_1.jpg"
          />
        </div>
      </div>
    </div>
  );
}
