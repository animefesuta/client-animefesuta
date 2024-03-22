import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { PersonalInfo } from "./_components/PersonalInfo";

const profileList = [
  {
    id: 0,
    title: "个人资料",
  },
  {
    id: 1,
    title: "直播设置",
  },
  {
    id: 2,
    title: "返图管理",
  },
  {
    id: 3,
    title: "我的贴子",
  },
  {
    id: 4,
    title: "活动详情",
  },
];

export default function User() {
  const userStore = useUserStore();
  const [profileId, setProfileId] = useState(0);
  const { userInfo } = userStore;

  return (
    <div className="mx-20 min-h-[300px] flex flex-col h-[calc(100vh-210px)] bg-white mt-16">
      <div className="bg-violet-400 w-full h-[150px] flex items-center px-6">
        <div className="flex text-white items-center gap-6">
          <div className="flex items-end justify-center">
            {/* 头像 */}
            {(userInfo.avatar && (
              <div
                className="w-24 border h-24 bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_MINIO_ENDPOINT
                  }/images${userInfo.avatar})`,
                }}
              ></div>
            )) || (
              <FaUser className="bg-gray-200 text-black flex justify-center items-center w-24 h-24 p-2 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            {/* 用户名 */}
            <div className="text-xl">{userInfo.nickname}</div>
            <div className="flex text-[12px] justify-center items-center gap-3">
              {/* 个性签名 */}
              {userInfo.instruction}
            </div>
            <div className="flex gap-3">
              <button className="text-[12px] bg-violet-500 hover:bg-violet-700 transition-all text-white px-3 py-1 rounded">
                创作中心
              </button>
              <button className="text-[12px] bg-violet-500 hover:bg-violet-700 transition-all text-white px-3 py-1 rounded">
                更换背景
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-auto">
        <div className="w-[200px] overflow-auto border-r-2 h-full flex flex-col">
          {profileList.map((item) => (
            <div
              className={
                profileId === item.id
                  ? "w-full py-2 bg-black text-white transition-all"
                  : "w-full py-2 bg-white"
              }
              key={item.id}
              onClick={() => setProfileId(item.id)}
            >
              <button className="w-full py-2">{item.title}</button>
            </div>
          ))}
          <div className="text-center my-2"></div>
        </div>
        <div className="flex-1">
          {profileId === 0 && <PersonalInfo {...userInfo} />}
          {profileId === 1 && <div>直播设置</div>}
          {profileId === 2 && <div>返图管理</div>}
          {profileId === 3 && <div>我的贴子</div>}
          {profileId === 4 && <div>活动详情</div>}
        </div>
      </div>
    </div>
  );
}
