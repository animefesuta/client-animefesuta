import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";
import { useState } from "react";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();

  const handleWheel = (e: { deltaY: number }) => {
    if (e.deltaY < 0) {
      api?.scrollPrev();
    } else {
      api?.scrollNext();
    }
  };

  return (
    <>
      <div className="h-[460px] flex items-center justify-center">
        <Carousel
          className="w-full h-full overflow-hidden"
          setApi={setApi}
          onWheel={handleWheel}
        >
          <CarouselContent>
            <CarouselItem className="w-full h-full flex justify-center">
              <div className="h-[460px] bg-[url('/elysia_1.jpg')] bg-cover w-full hover:scale-105 transform duration-300"></div>
            </CarouselItem>
            <CarouselItem className="w-full h-full flex justify-center">
              <div className="h-[460px] bg-[url('/elysia_2.jpg')] bg-cover w-full hover:scale-105 transform duration-300"></div>
            </CarouselItem>
            <CarouselItem className="w-full h-full flex justify-center">
              <div className="h-[460px] bg-[url('/elysia_3.png')] bg-cover w-full hover:scale-105 transform duration-300"></div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div>
        <h1 className="text-2xl text-blue-400 m-3">推荐</h1>
      </div>
    </>
  );
}
