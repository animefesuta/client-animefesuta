import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PersonalInfo } from "./_components/PersonalInfo";
import { LiveSettings } from "./_components/LiveSettings";
import { imageupload } from "@/api/pic";
import { updateUserBackground } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { PostManage } from "./_components/PostManage";
import { PicsManage } from "./_components/PicsManage";
import { NewsManage } from "./_components/NewsManage";
import { LivingManage } from "./_components/LivingManage";
import { UserManage } from "./_components/UserManage";
import { SystemManage } from "./_components/SystemManage";

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
    title: "活动管理",
  },
  // ADMIN
  {
    id: 5,
    title: "直播管理",
  },
  {
    id: 6,
    title: "用户管理",
  },
  {
    id: 7,
    title: "系统信息",
  },
];

export default function User() {
  const { userInfo, updateUserInfo } = useUserStore();
  const [profileId, setProfileId] = useState(0);
  const [backgroundImage, setBackground] = useState(userInfo.backgroundImage);
  const [profileListC, setProfileListC] = useState(profileList);

  const { toast } = useToast();

  useEffect(() => {
    if (userInfo.backgroundImage) {
      setBackground(
        `url(${import.meta.env.VITE_MINIO_ENDPOINT}/images${
          userInfo.backgroundImage
        })`
      );
    } else {
      setBackground("");
    }
    if (userInfo.type != "10") {
      setProfileListC(profileList.slice(0, 5));
    } else {
      setProfileListC(profileList);
    }
  }, [userInfo.backgroundImage, userInfo.type]);

  const updateBackground = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files!;
      imageupload(file).then((res) => {
        updateUserBackground({
          backgroundImage: res[0].filePath,
        }).then((r) => {
          updateUserInfo(r.data);
          setBackground(r.data.avatar);
          toast({
            description: "背景更新成功",
          });
        });
      });
    };
    input.click();
  };

  return (
    <div className="min-h-[300px] flex flex-col h-screen bg-white">
      <div
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "10% 10%",
        }}
        className="bg-violet-400 w-full h-[250px] flex items-center px-6"
      >
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
            <div className="flex text-[12px] items-center gap-3">
              {/* UID */}
              UID: {userInfo.uid}
            </div>
            <div className="flex gap-3">
              <button className="text-[12px] text-black flex justify-center items-center bg-white hover:bg-gray-200 transition-all px-3 py-1 rounded">
                AI创作中心
                <span className="text-red-500 text-[10px] mx-1 px-1 rounded-full bg-[#f5f5f5]">
                  VIP
                </span>
              </button>
              <button
                className="text-[12px] text-black bg-white hover:bg-gray-200 transition-all px-3 py-1 rounded"
                onClick={() => updateBackground()}
              >
                更换背景
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-auto">
        <div className="w-[200px] overflow-auto border-r-2 h-full flex flex-col">
          {profileListC.map((item) => (
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
          {profileId === 1 && <LiveSettings />}
          {profileId === 2 && <PicsManage />}
          {profileId === 3 && <PostManage />}
          {profileId === 4 && <NewsManage />}
          {/* 以下为管理员专用 */}
          {profileId === 5 && <LivingManage />}
          {profileId === 6 && <UserManage />}
          {profileId === 7 && <SystemManage />}
        </div>
      </div>
    </div>
  );
}
