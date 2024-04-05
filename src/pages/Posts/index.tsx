import { GoPlus, GoThumbsup } from "react-icons/go";
import { AiOutlineNumber } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { GiSesame } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { SubSwitch } from "./_components/SubSwitch";
import { NotebookPen } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import "@toast-ui/editor/dist/toastui-editor.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Editor } from "@toast-ui/react-editor";
import { Input } from "@/components/ui/input";
import { createPost, getPostsByTheme, getRanking } from "@/api/post";
import { useToast } from "@/components/ui/use-toast";
import { dateFormatted } from "@/lib/utils";
import { imageupload } from "@/api/pic";
import { Ranking, forumPost } from "@/api/post/types";
import { NavLink } from "react-router-dom";

const subSwitchs = [
  {
    id: "0",
    title: "推荐",
    icon: <GoThumbsup />,
  },
  {
    id: "1",
    title: "杂谈",
    icon: <AiOutlineNumber />,
  },
  {
    id: "2",
    title: "摄影",
    icon: <IoCameraOutline />,
  },
  {
    id: "3",
    title: "同人",
    icon: <GiSesame />,
  },
];

export default function Posts() {
  // 排行榜
  const [ranks, setRanks] = useState<Ranking[]>();
  // 文章
  const [sub, setSub] = useState<
    Pick<
      forumPost,
      "id" | "title" | "nickname" | "content" | "img" | "createTime"
    >[]
  >([]);
  const [currentSub, setCurrentSub] = useState<string>("0");
  const [title, setTitle] = useState("");
  const editorRef = useRef<Editor>(null);
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");
  const [draweropen, setDrawerOpen] = useState(false);

  const { toast } = useToast();

  const getSub = (sub: string) => {
    setCurrentSub(sub);
  };

  const submit = async () => {
    const { id } = await createPost({
      title: title,
      theme: theme,
      content: editorRef.current?.getInstance().getMarkdown(),
      img: image,
    });
    if (id) {
      setDrawerOpen(false);
      setTitle("");
      setTheme("");
      setImage("");
      editorRef.current?.getInstance().setMarkdown("");
      toast({
        description: "帖子发送成功，进入审核阶段~",
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
        setImage(res[0].filePath);
      });
    };
    input.click();
  };

  useEffect(() => {
    getRanking().then((res) => {
      setRanks(res);
    });

    getPostsByTheme(currentSub).then((res) => {
      setSub(
        res.map((item) => ({
          id: item.id,
          title: item.title,
          nickname: item.nickname,
          createTime: dateFormatted(item.createTime),
          content: item.content,
          img: item.img,
        }))
      );
    });
  }, [currentSub]);

  return (
    <div className="flex px-12 py-3 gap-5 justify-around">
      <div className="w-[12%] min-w-[12%] flex flex-col my-8 gap-2">
        {subSwitchs.map((item) => (
          <SubSwitch
            key={item.id}
            sub={item.id}
            title={item.title}
            currentSub={currentSub}
            getSub={getSub}
            iconel={() => item.icon}
          />
        ))}
      </div>
      <div className="flex h-screen flex-col w-[70%] min-w-[70%] max-w-[70%]">
        <div className="text-xl font-bold">
          {subSwitchs[parseInt(currentSub)].title}
        </div>
        {/* 文章列表 */}
        <div className="h-full bg-white px-2">
          {sub.map((item) => (
            <NavLink
              to={`/posts/${item.id}`}
              key={item.id}
              className="flex gap-2 my-2 cursor-pointer"
            >
              <div className="flex w-full gap-2">
                <div className="h-[125px] min-w-[250px] rounded-xl border overflow-hidden">
                  <div
                    className="h-[125px] w-[250px] transition-all hover:scale-110 bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${
                        import.meta.env.VITE_MINIO_ENDPOINT
                      }/images${item.img})`,
                    }}
                  ></div>
                </div>
                <div className="flex flex-col truncate justify-between py-2 w-full">
                  <div className="text-lg font-bold mb-5">{item.title}</div>
                  <div className="text-sm text-gray-400 truncate">
                    {item.content}
                  </div>
                  <div className="flex justify-between pr-3">
                    <div className="text-sm text-gray-400">{item.nickname}</div>
                    <div className="text-sm text-gray-400 text-[10px]">
                      {item.createTime}
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-[18%] min-w-[18%]">
        <button
          className="cursor-pointer w-full my-3 flex border py-3 rounded-xl hover:bg-sky-300 transition-all px-2 gap-2 bg-sky-400 text-white items-center"
          onClick={() => setDrawerOpen(true)}
        >
          <NotebookPen />
          发帖
        </button>
        <div>
          <div className="flex h-5 items-center text-sm">
            <div className="text-xl font-bold min-w-fit">排行榜</div>
            {/* {rankSwitchs.map((item) => (
              <Button
                disabled={currentRank === item.id}
                key={item.id}
                size="sm"
                variant="link"
                onClick={() => getRanks(item.id)}
              >
                {item.title}
              </Button>
            ))} */}
          </div>
          <Separator className="my-1" />
        </div>
        <div className="flex flex-col gap-2">
          {ranks &&
            ranks.map((rank, i) => (
              <div
                key={rank.id}
                className="text-nowrap flex gap-2 overflow-hidden"
              >
                <Badge
                  variant={i < 3 ? "destructive" : "default"}
                  className="text-sm w-6 flex justify-center items-center"
                >
                  {i + 1}
                </Badge>
                <div className="w-[90%] truncate hover:underline cursor-pointer">
                  {rank.title}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Drawer open={draweropen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <div className="w-full">
            <DrawerHeader>
              <DrawerTitle>发帖子</DrawerTitle>
              <DrawerDescription>
                {/* Set your daily activity goal. */}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 w-full pb-0">
              <div className="flex items-center pb-2">
                <div className="min-w-[60px]">标题</div>
                <Input
                  className="w-[20rem]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="min-w-[40px] ml-2">主题</div>
                <Select onValueChange={setTheme}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择帖子主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>主题</SelectLabel>
                      <SelectItem value="1">杂谈</SelectItem>
                      <SelectItem value="2">摄影</SelectItem>
                      <SelectItem value="3">同人</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pb-2">
                展示图
                <button
                  className="text-gray-400 transition-all hover:text-gray-600 border w-[100px] cursor-pointer"
                  onClick={() => updateShowBaseImage()}
                >
                  {(image && (
                    <div
                      className="w-[100px] h-[100px] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_MINIO_ENDPOINT
                        }/images${image})`,
                      }}
                    ></div>
                  )) || <GoPlus size={100} />}
                </button>
              </div>
              <div className="flex flex-col gap-2">
                内容
                <Editor
                  previewStyle="vertical"
                  height="400px"
                  initialEditType="markdown"
                  useCommandShortcut={true}
                  ref={editorRef}
                  hooks={{
                    addImageBlobHook: async (
                      blob: File,
                      callback: (url: string, alt: string) => void
                    ) => {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(blob);
                      const fileList = dataTransfer.files;
                      const uploadedImageURL = await imageupload(fileList);

                      callback(
                        `${import.meta.env.VITE_MINIO_ENDPOINT}/images${
                          uploadedImageURL[0].filePath
                        }`,
                        uploadedImageURL[0].id
                      );
                      return false;
                    },
                  }}
                />
              </div>
            </div>
            <DrawerFooter className="flex flex-row">
              <Button onClick={() => submit()}>提交</Button>
              <DrawerClose asChild>
                <Button variant="outline">取消</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
