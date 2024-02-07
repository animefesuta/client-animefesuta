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
import Card from "./_components/Card";

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
      {
        id: "12329",
        imgurl: "/elysia_4.png",
        title: "爱莉5",
        username: "ai",
        type: "ai",
      },
    ]);
  }, []);

  return (
    <>
      <div className="flex h-[460px] items-center mx-14 my-5 justify-center ">
        <MdKeyboardDoubleArrowLeft
          size={30}
          color="#CCC"
          cursor="pointer"
          onClick={() => api?.scrollPrev()}
        />
        <div className="flex-1 rounded-xl overflow-hidden">
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
                        `h-[460px] bg-cover w-full hover:scale-105 transform duration-300`
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
          size={30}
          color="#CCC"
          cursor="pointer"
          onClick={() => api?.scrollNext()}
        />
      </div>
      <div className="mx-20 flex justify-between">
        <div>
          <div>
            <h1 className="text-2xl m-3">精选返图</h1>
            <div className="flex gap-5 justify-around flex-wrap">
              <Card cards={cardItem} />
            </div>
          </div>

          {/* TODO */}
          <h1 className="text-2xl m-3">精选帖子</h1>
        </div>

        {/* TODO */}
        <div className="min-w-fit">
          <h1 className="text-2xl m-3">热门标签</h1>
          <h1 className="text-2xl m-3">本周热门</h1>
          <h1 className="text-2xl m-3">最近上传</h1>
        </div>
      </div>
      <div className="mx-20">
        {/* TODO */}
        <h1 className="text-2xl m-3">推荐Coser</h1>
      </div>
    </>
  );
}
