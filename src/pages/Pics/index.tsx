import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { BlankCard } from "./_components/BlankCard";
import { IoRefresh } from "react-icons/io5";
import PicsPost from "./_components/PicsPost";
import {
  getAllAuthors,
  getBanner,
  getPicsByAuthorUID,
  getRecommendPosts,
} from "@/api/pic";
import { Authors, BannerPics, PostPics } from "@/api/pic/types";
import { FaUser } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAiPosts } from "@/api/ai";
export default function Pics() {
  const [carouselItem, setCarouselItem] = useState<BannerPics[]>([]);

  const [aiPosts, setAiPosts] = useState<PostPics[]>([]);

  const [recommendPosts, setRecommendPosts] = useState<PostPics[]>([]);

  const [authorPosts, setAuthorPosts] = useState<PostPics[]>([]);

  const [authors, setAuthors] = useState<Authors[]>([]);

  const getPicsByAuthor = (uid: string) => {
    getPicsByAuthorUID(uid).then((res) => {
      setAuthorPosts(res);
    });
  };

  useEffect(() => {
    getBanner().then((res) => {
      setCarouselItem(res);
    });

    getRecommendPosts().then((res) => {
      setRecommendPosts(res);
    });

    getAllAuthors().then((res) => {
      setAuthors(res);
      if (res.length > 0) {
        getPicsByAuthor(res[0].uid);
      }
    });

    getAiPosts().then((res) => {
      setAiPosts(res);
    });
  }, []);

  return (
    <div className="max-w-[1800px] mx-auto">
      {carouselItem.length > 0 && (
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
                      key={item.id}
                      className="w-full h-full flex justify-center"
                    >
                      <div
                        className={clsx(
                          `h-[160px] md:h-[260px] lg:h-[360px] xl:h-[460px] bg-cover w-full hover:scale-105 transform duration-300`
                        )}
                        style={{
                          backgroundImage: `url(${
                            import.meta.env.VITE_MINIO_ENDPOINT
                          }/images${item.image[0]})`,
                        }}
                      ></div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      )}

      <div className="flex items-center md:mx-24 md:my-3">
        <div className="flex-1 h-2 m-2"></div>
        {/* 我要返图 */}
        <PicsPost />
      </div>
      {/* 为你推荐 */}
      {recommendPosts.length > 0 && (
        <div className="flex flex-col px-24">
          <h1 className="text-2xl w-full m-3">
            <span className="text-[32px]">为你推荐</span>
          </h1>
          <ScrollArea className="whitespace-nowrap">
            <div className="flex w-max space-x-4 p-4">
              {recommendPosts.map((item) => {
                return (
                  <BlankCard
                    key={item.id}
                    cardTitle={item.title}
                    cardId={item.id}
                    cardType={item.theme}
                    cardUrl={`${import.meta.env.VITE_MINIO_ENDPOINT}/images${
                      item.image[0]
                    }`}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}

      {authorPosts.length > 0 && (
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
                    key={item.uid}
                    className="flex cursor-pointer hover:bg-sky-100 p-2 flex-col items-center justify-center w-full"
                    onClick={() => getPicsByAuthor(item.uid)}
                  >
                    {(item.avatar && (
                      <div
                        className="w-12 border h-12 bg-cover bg-center rounded-full"
                        style={{
                          backgroundImage: `url(${
                            import.meta.env.VITE_MINIO_ENDPOINT
                          }/images${item.avatar})`,
                        }}
                      ></div>
                    )) || (
                      <FaUser className="bg-gray-200 text-black flex justify-center items-center w-12 h-12 p-2 rounded-full" />
                    )}
                    <div className="w-full">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className=" w-full truncate">
                            {item.username}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.username}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
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
                {authorPosts
                  .filter((item) => item.image)
                  .map((item) => {
                    return (
                      <BlankCard
                        key={item.id}
                        cardTitle={item.title}
                        cardId={item.id}
                        cardType={item.theme}
                        cardUrl={`${
                          import.meta.env.VITE_MINIO_ENDPOINT
                        }/images${item.image[0]}`}
                      />
                    );
                  })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      )}

      {/* AI绘图 */}
      {aiPosts.length > 0 && (
        <div className="flex flex-col px-24 my-6">
          <h1 className="text-2xl flex gap-2 items-center m-3">
            <span className="text-[32px]">AI绘图</span>
            <button
              className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1"
              onClick={() => {
                getAiPosts().then((res) => {
                  setAiPosts(res);
                });
              }}
            >
              <IoRefresh />
              <span>换一换</span>
            </button>
          </h1>
          <div className="flex w-max space-x-4 p-4 mx-auto">
            {aiPosts.map((item) => {
              return (
                <BlankCard
                  key={item.id}
                  cardTitle={item.title}
                  cardId={item.id}
                  cardType={item.theme}
                  cardUrl={`${import.meta.env.VITE_MINIO_ENDPOINT}/images${
                    item.image[0]
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
