import MuxPlayer from "@mux/mux-player-react";
import { MdLiveTv } from "react-icons/md";
import { LiveCard } from "./_components/LiveCard";
import { getAllLivingRoom, getLatestPlaybackId } from "@/api/live";
import { useEffect, useState } from "react";
import { LiveRoom } from "@/api/live/types";
export default function Live() {
  const [newPlay, setNewPlay] = useState<string>();
  const [nowLiving, setNowLiving] = useState<LiveRoom[]>();
  useEffect(() => {
    getLatestPlaybackId().then((res) => {
      setNewPlay(res.data);
    });
    getAllLivingRoom().then((res) => {
      setNowLiving(res);
    });
  }, []);
  return (
    <div className="px-20 py-2">
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
          {nowLiving?.map((item) => (
            <LiveCard
              liveId={item.key}
              liveTitle={item.title}
              liveAuthor={item.creator}
              liveImage={`${import.meta.env.VITE_MINIO_ENDPOINT}/images${
                item.cover
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
