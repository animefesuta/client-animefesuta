import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { PencilRuler } from "lucide-react";
import { BlankCard } from "./_components/BlankCard";
import { IoRefresh } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface CardProps {
  cardTitle: string;
  cardId: string;
  cardType: string;
  cardUrl: string;
}
interface Author {
  authorname: string;
  authorid: string;
  authorimage: string;
}
export default function Pics() {
  const [carouselItem, setCarouselItem] = useState<
    { name: string; url: string }[]
  >([]);

  const [blankItem, setBlankItem] = useState<CardProps[]>([]);

  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    setCarouselItem(() =>
      Array.from({ length: 3 }, (_, i) => ({
        name: `elysia${i}`,
        url: "/elysia_1.jpg",
      }))
    );

    setAuthors(() =>
      Array.from({ length: 3 }, (_, i) => ({
        authorname: `elysia${i}`,
        authorid: `elysia${i}`,
        authorimage: "/txmascot.png",
      }))
    );

    setBlankItem(() =>
      Array.from({ length: 10 }, (_, i) => ({
        cardTitle: "返图",
        cardId: `${i}`,
        cardType: "返图",
        cardUrl: "/elysia_1.jpg",
      }))
    );
  }, []);

  return (
    <div className="max-w-[1800px] mx-auto">
      <div className="flex h-[160px] md:h-[260px] lg:h-[360px] xl:h-[460px] items-center justify-center">
        <div className="flex-1 overflow-hidden">
          <Carousel
            className="w-full h-full"
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {carouselItem.map((item) => {
                return (
                  <CarouselItem
                    key={item.name}
                    className="w-full h-full flex justify-center"
                  >
                    <div
                      className={clsx(
                        `h-[160px] md:h-[260px] lg:h-[360px] xl:h-[460px] bg-cover w-full hover:scale-105 transform duration-300`
                      )}
                      style={{ backgroundImage: `url(${item.url})` }}
                    ></div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="flex items-center md:mx-24 md:my-3">
        <div className="flex-1 h-2 m-2"></div>
        <div className="py-2 px-14 text-white rounded-md flex gap-2 items-center text-[24px] justify-center bg-sky-400 hover:bg-sky-300 cursor-pointer transition-all">
          <PencilRuler size={26} />
          <div>我要返图</div>
        </div>
      </div>
      {/* 为你推荐 */}
      <div className="flex flex-col px-24">
        <h1 className="text-2xl w-full m-3">
          <span className="text-[32px]">为你推荐</span>
        </h1>
        <ScrollArea className="whitespace-nowrap">
          <div className="flex w-max space-x-4 p-4">
            {blankItem.map((item) => {
              return <BlankCard key={item.cardId} {...item} />;
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="flex px-24 gap-3 w-full">
        {/* 热门作者 */}
        <div className="flex flex-col my-6">
          <h1 className="text-2xl flex gap-2 items-center m-3">
            <span className="text-[32px]">热门作者</span>
          </h1>
          <ScrollArea className="h-[332px] w-48">
            <div className="grid grid-cols-2 gap-3 p-2">
              {authors.map((item) => (
                <div
                  key={item.authorid}
                  className="flex hover:bg-sky-100 p-2 flex-col items-center justify-center"
                >
                  <Avatar>
                    <AvatarImage src={item.authorimage} alt={item.authorname} />
                    <AvatarFallback>{item.authorname}</AvatarFallback>
                  </Avatar>
                  <div>{item.authorname}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        {/* 最近上传 */}
        <div className="flex flex-col my-6 w-[calc(100%-204px)]">
          <h1 className="text-2xl flex gap-2 items-center m-3">
            <span className="text-[32px]">最近上传</span>
            <div className="text-[16px] text-[rgba(0,20,39,.5)]">
              <span>~{new Date().toLocaleDateString()}</span>
            </div>
          </h1>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
              {blankItem.map((item) => {
                return <BlankCard key={item.cardId} {...item} />;
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* AI绘图 */}
      <div className="flex flex-col px-24 my-6">
        <h1 className="text-2xl flex gap-2 items-center m-3">
          <span className="text-[32px]">AI绘图</span>
          <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
            <IoRefresh />
            <span>换一换</span>
          </div>
        </h1>
        <ScrollArea className="whitespace-nowrap">
          <div className="flex w-max space-x-4 p-4">
            {blankItem.map((item) => {
              return <BlankCard key={item.cardId} {...item} />;
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
