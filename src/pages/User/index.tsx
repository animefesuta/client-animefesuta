import { useUserStore } from "@/store/userStore";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { PersonalInfo } from "./_components/PersonalInfo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateUserInstruction } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { UserResponse } from "@/api/user/types";

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
  const [open, setOpen] = useState(false);
  const { userInfo, updateUserInfo } = userStore;
  const [instruction, setInstruction] = useState(userInfo.instruction);
  const { toast } = useToast();

  const handleInstructionUpdate = (response: UserResponse) => {
    if (response.code === 200) {
      updateUserInfo(response.data);
      setOpen(false);
      toast({
        description: "签名更新成功",
      });
    } else {
      toast({
        variant: "destructive",
        description: "失败",
      });
    }
  };

  return (
    <div className="mx-20 min-h-[300px] flex flex-col h-[calc(100vh-210px)] bg-white mt-16">
      <div className="bg-sky-500 w-full h-[150px] flex justify-center items-center px-6">
        <div className="flex mt-[-60px] text-white flex-col gap-1">
          <div className="flex items-end justify-center">
            {/* 头像 */}
            {(userInfo.avatar && (
              <div
                className="w-24 h-24 bg-cover bg-center rounded-full"
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
          {/* 用户名 */}
          <div className="text-xl text-center">{userInfo.nickname}</div>
          <div className="flex text-[12px] justify-center items-center gap-3">
            {/* 个性签名 */}
            <span>{userInfo.instruction}</span>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <PencilLine size={16} className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>个性签名</DialogTitle>
                  {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() =>
                      updateUserInstruction({ instruction: instruction }).then(
                        (res) => {
                          handleInstructionUpdate(res);
                        }
                      )
                    }
                  >
                    保存
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex justify-around">
            <button className="text-[12px] bg-sky-600 hover:bg-sky-700 transition-all text-white px-3 py-1 rounded">
              创作中心
            </button>
            <button className="text-[12px] bg-sky-600 hover:bg-sky-700 transition-all text-white px-3 py-1 rounded">
              更换背景
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-auto">
        <div className="w-[200px] overflow-auto border-r-2 h-full flex flex-col">
          {profileList.map((item) => (
            <div
              className={
                profileId === item.id
                  ? "w-full py-2 bg-blue-400 text-white transition-all"
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
        <div>
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
