import { createLiveStream } from "@/api/live";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/store/types";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

const LiveSettings: React.FC<UserInfo> = ({ ...UserInfo }) => {
  const [streamKey, setStreamKey] = useState<string>();
  const getStreamID = async () => {
    const { key } = await createLiveStream();
    setStreamKey(key);
  };
  return (
    <div className="flex gap-6 p-6">
      <div className="flex flex-col gap-6">
        <div>
          <div>直播分类：</div>
          <div className="w-[20rem]">
            <Input />
          </div>
        </div>
        <div>
          <div>房间标题：</div>
          <div className="w-[20rem]">
            <Input />
          </div>
        </div>
        <div>
          <div>直播封面：</div>
          <div className="text-gray-400 transition-all hover:text-gray-600 border w-[100px] cursor-pointer">
            <GoPlus size={100} />
          </div>
        </div>
        <button
          className="w-24 h-10 transition-all bg-black hover:bg-gray-600 text-white"
          onClick={() => getStreamID()}
        >
          开始直播
        </button>
      </div>
      {streamKey && (
        <div className="flex flex-col gap-6">
          <div>
            <div>推流服务器:</div>
            <div className="h-[40px] border rounded-md pl-1 pr-4 flex items-center">
              rtmp://global-live.mux.com:5222/app
            </div>
          </div>
          <div>
            <div>推流码:</div>
            <div className="h-[40px] border rounded-md pl-1 pr-4 flex items-center">
              {streamKey}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export { LiveSettings };
