import { imageupload } from "@/api/pic";
import { updateUserAvatar } from "@/api/user";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/store/types";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const PersonalInfo: React.FC<UserInfo> = ({ ...UserInfo }) => {
  const [nickname, setNickname] = useState(UserInfo.nickname);
  const [avatar, setAvatar] = useState(UserInfo.avatar);
  const { updateUserInfo } = useUserStore();

  const updateAvatar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files!;
      imageupload(file).then((res) => {
        updateUserAvatar({
          avatar: res[0].filePath,
        }).then((r) => {
          updateUserInfo(r);
          setAvatar(r.avatar);
        });
      });
    };
    input.click();
  };
  return (
    <div>
      <div>
        <span className="text-[#666]">头像</span>
        {(avatar && (
          <div
            onClick={() => updateAvatar()}
            className="w-24 h-24 cursor-pointer bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url(${
                import.meta.env.VITE_MINIO_ENDPOINT
              }/images${avatar})`,
            }}
          ></div>
        )) || (
          <FaUser
            className="bg-gray-200 cursor-pointer text-black flex justify-center items-center w-24 h-24 p-2 rounded-full"
            onClick={() => updateAvatar()}
          />
        )}
      </div>
      <div>
        <span className="text-[#666]">昵称</span>
        <Input
          className="text-[#333]"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
    </div>
  );
};

export { PersonalInfo };
