import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import clsx from "clsx";
import { useEffect, useState } from "react";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { VerticalCard } from "./_components/VerticalCard";
import Tag from "./_components/Tag";
import { IoIosArrowForward } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import { HorizontalCard } from "./_components/HorizontalCard";
const colorArray = [
  "#6c5ce7",
  "#00b894",
  "#fd79a8",
  "#6ab04c",
  "#30336b",
  "#e056fd",
];

export default function Home() {
  const [carouselItem, setCarouselItem] = useState<
    { name: string; url: string }[]
  >([]);

  const [cardItem, setCardItem] = useState<
    {
      id: string;
      imgurl: string;
      title: string;
      username: string;
      type: string;
    }[]
  >([]);

  const [spanItem, setSpanItem] = useState<{ name: string; id: string }[]>([]);

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    setCarouselItem(() => [
      {
        name: "elysia_1",
        url: "/elysia_1.jpg",
      },
      {
        name: "elysia_2",
        url: "/elysia_2.jpg",
      },
      {
        name: "elysia_3",
        url: "/elysia_3.png",
      },
      {
        name: "elysia_4",
        url: "/elysia_4.png",
      },
    ]);

    setCardItem(() => [
      {
        id: "12321",
        imgurl: "/elysia_1.jpg",
        title: "爱莉1",
        username: "ai",
        type: "ai",
      },
      {
        id: "12322",
        imgurl: "/elysia_2.jpg",
        title: "爱莉2",
        username: "ai",
        type: "ai",
      },
      {
        id: "12323",
        imgurl: "/elysia_3.png",
        title: "爱莉3",
        username: "ai",
        type: "ai",
      },
      {
        id: "12324",
        imgurl: "/elysia_4.png",
        title: "爱莉5",
        username: "ai",
        type: "ai",
      },
      {
        id: "12325",
        imgurl: "/elysia_4.png",
        title: "爱莉5",
        username: "ai",
        type: "ai",
      },
      {
        id: "12326",
        imgurl: "/elysia_4.png",
        title: "爱莉5",
        username: "ai",
        type: "ai",
      },
      {
        id: "12327",
        imgurl: "/elysia_4.png",
        title: "爱莉5",
        username: "ai",
        type: "ai",
      },
      {
        id: "12328",
        imgurl: "/elysia_4.png",
        title: "爱莉5",
        username: "ai",
        type: "ai",
      },
    ]);

    setSpanItem(() => [
      { name: "米哈游", id: "u12345" },
      { name: "大伟哥", id: "u12346" },
      { name: "爱莉希雅", id: "u12347" },
      { name: "格蕾修", id: "u12348" },
      { name: "流萤", id: "u12349" },
      { name: "Arch", id: "u12310" },
      { name: "mmd", id: "u12311" },
      { name: "unreal", id: "u12312" },
      { name: "unity", id: "u12313" },
    ]);
  }, []);

  return (
    <div className="max-w-[1800px] mx-auto">
      <div className="flex h-[160px] md:h-[260px] lg:h-[360px] xl:h-[460px] items-center md:mx-14 md:my-5 justify-center">
        <MdKeyboardDoubleArrowLeft
          className="hidden md:block"
          size={30}
          color="#CCC"
          cursor="pointer"
          onClick={() => api?.scrollPrev()}
        />
        <div className="flex-1 md:rounded-xl overflow-hidden">
          <Carousel
            className="w-full h-full"
            setApi={setApi}
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
        <MdKeyboardDoubleArrowRight
          className="hidden md:block"
          size={30}
          color="#CCC"
          cursor="pointer"
          onClick={() => api?.scrollNext()}
        />
      </div>
      <div className="md:mx-20 flex">
        {/* 首页左侧 */}
        <div className="flex flex-1 flex-col min-w-[340px] ">
          {/* 精选返图 */}
          <div>
            <h1 className="text-2xl flex gap-2 items-center justify-between m-3">
              <span>精选返图</span>
              <div className="bg-[url(/arrow_r.png)] bg-center flex-1 h-4"></div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <IoRefresh />
                <span>换一换</span>
              </div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <span>更多</span>
                <IoIosArrowForward />
              </div>
            </h1>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {cardItem.map((item) => (
                <VerticalCard {...item} key={item.id} />
              ))}
            </div>
          </div>

          {/* 精选帖子 */}
          <div>
            <h1 className="text-2xl flex gap-2 items-center justify-between m-3">
              <span>精选帖子</span>
              <div className="bg-[url(/arrow_r.png)] bg-center flex-1 h-4"></div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <IoRefresh />
                <span>换一换</span>
              </div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <span>更多</span>
                <IoIosArrowForward />
              </div>
            </h1>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {cardItem.map((item) => (
                <VerticalCard {...item} key={item.id} />
              ))}
            </div>
          </div>

          {/* 推荐Coser */}
          <div>
            <h1 className="text-2xl flex gap-2 items-center justify-between m-3">
              <span>推荐Coser</span>
              <div className="bg-[url(/arrow_r.png)] bg-center flex-1 h-4"></div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <IoRefresh />
                <span>换一换</span>
              </div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <span>更多</span>
                <IoIosArrowForward />
              </div>
            </h1>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {cardItem.map((item) => (
                <VerticalCard {...item} key={item.id} />
              ))}
            </div>
          </div>
        </div>

        {/* 首页右侧栏 */}
        <div className="hidden md:flex text-2xl m-3 w-[21rem] flex-col gap-4">
          <div className="bg-[url(/board.png)] bg-contain bg-no-repeat bg-center bg-opacity-20 rounded-lg w-full h-[130px] cursor-pointer"></div>
          <div className="flex flex-col gap-2">
            <div>热门标签</div>
            <div className="text-sm flex gap-2 flex-wrap">
              {spanItem.map((item) => (
                <Tag
                  tagColor={
                    colorArray[Math.floor(Math.random() * colorArray.length)]
                  }
                  tagId={item.id}
                  tagValue={item.name}
                  key={item.id}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-2 items-center justify-between">
              <span>本周热门</span>
              <div className="bg-[url(/arrow_r.png)] bg-center flex-1 h-4"></div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <span>更多</span>
                <IoIosArrowForward />
              </div>
            </div>
            <div className="bg-white mt-3 rounded-xl">
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-2 items-center justify-between">
              <span>最近上传</span>
              <div className="bg-[url(/arrow_r.png)] bg-center flex-1 h-4"></div>
              <div className="text-[16px] bg-white text-[rgba(0,20,39,.5)] hover:text-white flex justify-center items-center transform duration-150 hover:bg-[#53b2f4] cursor-pointer rounded-full px-4 py-1">
                <span>更多</span>
                <IoIosArrowForward />
              </div>
            </div>
            <div className="bg-white mt-3 rounded-xl">
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
              <HorizontalCard
                id="12"
                imgurl="/elysia_3.png"
                title="elysia"
                username="ai"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
