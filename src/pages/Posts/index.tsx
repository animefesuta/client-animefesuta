import { GoThumbsup } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiOutlineNumber } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { GiSesame } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
export default function Posts() {
  const [ranks, setRanks] = useState<{ id: number; title: string }[]>([]);
  const [currentRank, setCurrentRank] = useState<number>(0);
  const getRanks = (rank: number, currentRank: number) => {
    setRanks(
      Array.from({ length: rank }, (_, i) => ({
        id: i,
        title: `标题标题标题标题标题标题标题标题标题标题标题${i}`,
      }))
    );
    setCurrentRank(currentRank);
  };

  useEffect(() => {
    getRanks(10, 0);
  }, []);
  return (
    <div className="flex px-12 py-3 gap-5 justify-around h-[calc(100vh-144px)]">
      <div className="min-w-fit w-[10%] flex flex-col my-8 gap-2">
        {/* 推荐 */}
        <div className="flex gap-2 h-12 text-[15px] items-center cursor-pointer">
          <GoThumbsup size={20} />
          <span>推荐</span>
        </div>
        {/* 杂谈 */}
        <div className="flex gap-2 h-12 text-[15px] items-center cursor-pointer">
          <AiOutlineNumber size={20} />
          <span>杂谈</span>
        </div>
        {/* 摄影 */}
        <div className="flex gap-2 h-12 text-[15px] items-center cursor-pointer">
          <IoCameraOutline size={20} />
          <span>摄影</span>
        </div>
        {/* 摄影 */}
        <div className="flex gap-2 h-12 text-[15px] items-center cursor-pointer">
          <GiSesame size={20} />
          <span>同人</span>
        </div>
      </div>
      <div className="flex flex-col h-full flex-1">
        <div className="text-xl font-bold">推荐文章</div>
        {/* 文章列表 */}
        <div className="w-full h-full bg-white px-2">
          <ScrollArea className="h-full w-full">
            <div className="flex gap-2 my-2">
              <Skeleton className="h-[125px] w-[350px] rounded-xl" />
              <div className="space-y-2 flex-col flex justify-evenly  w-full">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="w-[20%]">
        <div>
          <div className="flex h-5 items-center text-sm">
            <div className="text-xl font-bold min-w-fit">排行榜</div>
            <Button
              disabled={currentRank === 0}
              size="sm"
              variant="link"
              onClick={() => getRanks(10, 0)}
            >
              昨天
            </Button>
            <Separator orientation="vertical" />
            <Button
              disabled={currentRank === 1}
              size="sm"
              variant="link"
              onClick={() => getRanks(3, 1)}
            >
              前天
            </Button>
            <Separator orientation="vertical" />
            <Button
              disabled={currentRank === 2}
              size="sm"
              variant="link"
              onClick={() => getRanks(5, 2)}
            >
              周榜
            </Button>
            <Separator orientation="vertical" />
            <Button
              disabled={currentRank === 3}
              size="sm"
              variant="link"
              onClick={() => getRanks(8, 3)}
            >
              月榜
            </Button>
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
