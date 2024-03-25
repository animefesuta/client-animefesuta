import {
  closeLiveRoom,
  createLiveStream,
  getLiveRoom,
  updateLiveRoom,
} from "@/api/live";
import { imageupload } from "@/api/pic";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

const LiveSettings: React.FC = () => {
  const [streamKey, setStreamKey] = useState<string>();
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  const [existRoom, setExistRoom] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [cover, setCover] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const getStreamID = async () => {
    if (existRoom) {
      return;
    }
    setCreateRoom(true);
    const { key } = await createLiveStream({
      title: title,
      cover: cover,
      category: category,
    });
    if (key) {
      setStreamKey(key);
      setCreateRoom(false);
      toast({
        description: "创建直播间成功",
      });
    }
  };

  const updateShowBaseImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files!;
      imageupload(file).then((res) => {
        setCover(res[0].filePath);
      });
    };
    input.click();
  };

  const updateStream = async () => {
    updateLiveRoom({
      title: title,
      cover: cover,
      category: category,
    }).then((res) => {
      if (res) {
        toast({
          description: "更新成功",
        });
      }
    });
  };

  const closeStream = async () => {
    closeLiveRoom().then((res) => {
      if (res === true) {
        setStreamKey("");
        setExistRoom(false);
        toast({
          description: "关闭直播间成功",
        });
      }
    });
  };

  useEffect(() => {
    getLiveRoom().then((res) => {
      if (res) {
        setStreamKey(res.key);
        setTitle(res.title);
        setCategory(res.category);
        setCover(res.cover);
        setExistRoom(true);
      } else {
        setExistRoom(false);
      }
    });
  }, [createRoom]);
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex flex-col gap-6">
        <div>
          <div>直播分类：</div>
          <div className="w-[20rem]">
            <Input
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>房间标题：</div>
          <div className="w-[20rem]">
            <Input
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>直播封面：</div>
          <button
            className="text-gray-400 transition-all hover:text-gray-600 border w-[100px] cursor-pointer"
            onClick={() => updateShowBaseImage()}
          >
            {(cover && (
              <div
                className="w-[100px] h-[100px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_MINIO_ENDPOINT
                  }/images${cover})`,
                }}
              ></div>
            )) || <GoPlus size={100} />}
          </button>
        </div>
        {(existRoom && (
          <div className="flex gap-3">
            <button
              className="px-3 h-10 transition-all bg-sky-500 hover:bg-sky-600 text-white"
              onClick={() => updateStream()}
            >
              更新直播信息
            </button>
            <button
              className="px-3 h-10 transition-all bg-red-500 hover:bg-red-600 text-white"
              onClick={() => closeStream()}
            >
              关闭直播
            </button>
          </div>
        )) || (
          <button
            className="w-24 h-10 transition-all bg-black hover:bg-gray-600 text-white"
            onClick={() => getStreamID()}
          >
            开始直播
          </button>
        )}
      </div>
      {streamKey && (
        <div className="flex flex-col gap-6">
          <div className="w-[20rem]">
            <div>推流服务器:</div>
            <Input
              defaultValue="rtmp://global-live.mux.com:5222/app"
              readOnly
            />
          </div>
          <div className="w-[20rem]">
            <div>推流码:</div>
            <Input defaultValue={streamKey} readOnly />
          </div>
        </div>
      )}
      {createRoom && <div className="m-auto">正在创建直播间...</div>}
    </div>
  );
};
export { LiveSettings };
