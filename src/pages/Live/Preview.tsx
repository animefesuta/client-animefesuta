import { getRoomByUID } from "@/api/live";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Preview: React.FC = () => {
  const { uid } = useParams();
  const [roomID, setRoomID] = useState<string>("");

  useEffect(() => {
    if (uid) {
      getRoomByUID(uid).then((res) => {
        setRoomID(res);
      });
    }
  }, [setRoomID, uid]);

  return (
    (roomID && (
      <div className="px-16 py-1">
        <div className="flex justify-center">
          <MuxPlayer
            playbackId={roomID}
            className="w-full h-[680px]"
            poster="/elysia_1.jpg"
          />
        </div>
      </div>
    )) || (
      <div className="h-[800px] flex justify-center items-center">无人区</div>
    )
  );
};

export default Preview;
