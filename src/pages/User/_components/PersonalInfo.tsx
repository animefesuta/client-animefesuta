import { imageupload } from "@/api/pic";
import {
  updateUserAvatar,
  updateUserInstruction,
  updateUserNickName,
} from "@/api/user";
import { UserInfo } from "@/store/types";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FaUser } from "react-icons/fa";

const PersonalInfo: React.FC<UserInfo> = ({ ...UserInfo }) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>();
  const [dialogInputValue, setDialogInputValue] = useState<string>();
  const [dialogDescription, setDialogDescription] = useState<string>();
  const [currentDialogTag, setDialogTag] = useState(0);
  const [avatar, setAvatar] = useState(UserInfo.avatar);
  const { updateUserInfo } = useUserStore();
  const { toast } = useToast();

  const handleUpdate = () => {
    if (currentDialogTag === 0) {
      updateUserNickName({
        nickname: dialogInputValue,
      }).then((res) => {
        updateUserInfo(res.data);
        setOpen(false);
        toast({
          description: "昵称更新成功",
        });
      });
    } else if (currentDialogTag === 1) {
      toast({
        variant: "destructive",
        description: "该功能暂未开放",
      });
    } else if (currentDialogTag === 2) {
      updateUserInstruction({
        instruction: dialogInputValue,
      }).then((res) => {
        updateUserInfo(res.data);
        setOpen(false);
        toast({
          description: "签名更新成功",
        });
      });
    }
  };

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
          toast({
            description: "头像更新成功",
          });
        });
      });
    };
    input.click();
  };
  const setNickNameOpen = () => {
    setDialogDescription("");
    setDialogTitle("修改昵称");
    setDialogInputValue(UserInfo.nickname);
    setDialogTag(0);
    setOpen(true);
  };

  const setEmailOpen = () => {
    setDialogTitle("修改邮箱");
    setDialogDescription("修改邮箱后需要重新登录");
    setDialogInputValue(UserInfo.email);
    setDialogTag(1);
    setOpen(true);
  };

  const setIntructionOpen = () => {
    setDialogDescription("");
    setDialogTitle("修改签名");
    setDialogInputValue(UserInfo.instruction);
    setDialogTag(2);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-end gap-3">
          <div className="text-sm">头像:</div>
          {(avatar && (
            <div
              className="border w-[100px] h-[100px] rounded-full bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_MINIO_ENDPOINT
                }/images${avatar})`,
              }}
            ></div>
          )) || (
            <FaUser className="bg-gray-200 text-black border flex justify-center items-center w-24 h-24 p-2 rounded-full" />
          )}
          <button onClick={updateAvatar}>
            <PencilLine size={16} className="cursor-pointer" />
          </button>
        </div>
        <div className="flex items-end gap-3">
          <div className="text-sm">昵称:</div>
          <div>{UserInfo.nickname}</div>
          <button onClick={() => setNickNameOpen()}>
            <PencilLine size={16} className="cursor-pointer" />
          </button>
        </div>
        <div className="flex items-end gap-3">
          <div className="text-sm">邮箱:</div>
          <div>{UserInfo.email}</div>
          <button onClick={() => setEmailOpen()}>
            <PencilLine size={16} className="cursor-pointer" />
          </button>
        </div>
        <div className="flex items-end gap-3">
          <div className="text-sm">个性签名:</div>
          <div>{UserInfo.instruction}</div>
          <button onClick={() => setIntructionOpen()}>
            <PencilLine size={16} className="cursor-pointer" />
          </button>
        </div>
        {/* <div className="flex items-end gap-3">
          <div>性别</div>
          <div>{userInfo.nickname}</div>
          <button onClick={() => setNickNameOpen()}>
            <PencilLine size={16} className="cursor-pointer" />
          </button>
        </div>
        <div className="flex items-end gap-3">
          <div>出生日期</div>
          <div>{userInfo.nickname}</div>
          <button onClick={() => setNickNameOpen()}>
            <PencilLine size={16} className="cursor-pointer" />
          </button>
        </div> */}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="text-gray-500">{dialogDescription}</div>
          </DialogDescription>
          <div className="grid gap-4 py-4">
            <Input
              value={dialogInputValue}
              onChange={(e) => setDialogInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleUpdate()}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { PersonalInfo };
