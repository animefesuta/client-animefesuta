import { GoThumbsup } from "react-icons/go";
import { AiOutlineNumber } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { GiSesame } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { SubSwitch } from "./_components/SubSwitch";

const subSwitchs = [
  {
    id: 0,
    title: "推荐",
    icon: <GoThumbsup />,
  },
  {
    id: 1,
    title: "杂谈",
    icon: <AiOutlineNumber />,
  },
  {
    id: 2,
    title: "摄影",
    icon: <IoCameraOutline />,
  },
  {
    id: 3,
    title: "同人",
    icon: <GiSesame />,
  },
];

const rankSwitchs = [
  {
    id: 0,
    title: "今天",
  },
  {
    id: 1,
    title: "本周",
  },
  {
    id: 2,
    title: "本月",
  },
];

export default function Posts() {
  // 排行榜
  const [ranks, setRanks] = useState<{ id: number; title: string }[]>([]);
  // 文章
  const [sub, setSub] = useState<
    {
      id: number;
      title: string;
      author: string;
      date: string;
      content: string;
    }[]
  >([]);
  const [currentRank, setCurrentRank] = useState<number>(0);
  const [currentSub, setCurrentSub] = useState<number>(0);

  const getRanks = (rank: number) => {
    setCurrentRank(rank);
  };

  const getSub = (sub: number) => {
    setCurrentSub(sub);
  };

  useEffect(() => {
    setRanks(
      Array.from({ length: currentRank }, (_, i) => ({
        id: i,
        title: `标题标题标题标题标题标题标题标题标题标题标题${i}`,
      }))
    );
    setSub(
      Array.from({ length: currentSub }, (_, i) => ({
        id: i,
        title: `标题标题标题标题标题标题标题标题标题标题标题`,
        author: "作者",
        date: "2022-01-01",
        content:
          "dsadhasudhsdkahdkdsadhasudhsdkahdkdsadhasudhsdkahdkdsadhasudhsdkahdkdsadhasudhsdkahdkdsadhasudhsdkahdkdsadhasudhsdkahdk",
      }))
    );
  }, [currentRank, currentSub]);

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
      <div className="flex flex-col h-full w-[70%] min-w-[70%] max-w-[70%]">
        <div className="text-xl font-bold">{subSwitchs[currentSub].title}</div>
        {/* 文章列表 */}
        <div className="h-full bg-white px-2">
          {sub.map((item) => (
            <div key={item.id} className="flex gap-2 my-2 cursor-pointer">
              <div className="flex w-full gap-2">
                <div className="h-[125px] w-[250px] rounded-xl bg-sky-300" />
                <div className="flex flex-col truncate">
                  <div className="text-lg font-bold mb-5">{item.title}</div>
                  <div className="text-sm text-gray-400">{item.author}</div>
                  <div className="text-sm text-gray-400">{item.date}</div>
                  <div className="text-sm text-gray-400 truncate">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[18%] min-w-[18%]">
        <div>
          <div className="flex h-5 items-center text-sm">
            <div className="text-xl font-bold min-w-fit">排行榜</div>
            {rankSwitchs.map((item) => (
              <Button
                disabled={currentRank === item.id}
                key={item.id}
                size="sm"
                variant="link"
                onClick={() => getRanks(item.id)}
              >
                {item.title}
              </Button>
            ))}
          </div>
          <Separator className="my-1" />
        </div>
        <div className="flex flex-col gap-2">
          {ranks.map((rank, i) => (
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
    </div>
  );
}
