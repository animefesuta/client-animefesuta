import { GoThumbsup } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiOutlineNumber } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { GiSesame } from "react-icons/gi";

export default function Posts() {
  return (
    <div className="flex px-12 py-3 gap-5 justify-around h-[calc(100vh-144px)]">
      <div className="w-[10%] flex flex-col my-8 gap-2">
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
      <div className="w-[23%]"></div>
    </div>
  );
}
