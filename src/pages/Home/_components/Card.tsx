import React, { useState } from "react";

type Card = {
  id: string;
  imgurl: string;
  title: string;
  username: string;
  type: string;
};

interface CardProps {
  cards: Card[];
}

const Card: React.FC<CardProps> = ({ cards }) => {
  const [hoveredImgId, setHoveredImgId] = useState("");

  return (
    <>
      {cards.map((item) => (
        <div
          key={item.id}
          className="border bg-white flex flex-col overflow-hidden w-[260px] h-[200px] rounded-xl"
        >
          {/* img */}
          <div
            className={`flex-1 rounded-t-xl transition-all overflow-hidden ${
              hoveredImgId === item.id ? "duration-300 scale-150" : ""
            }`}
            onMouseEnter={() => setHoveredImgId(item.id)}
            onMouseLeave={() => setHoveredImgId("")}
          >
            <div
              className="w-full h-full bg-cover cursor-pointer"
              style={{ backgroundImage: `url(${item.imgurl})` }}
            ></div>
          </div>
          {/* title */}
          <div className="cursor-pointer w-fit ml-2 text-[18px] mr-16 overflow-hidden text-ellipsis">
            {item.title}
          </div>
          {/* footer */}
          <div className="m-2 text-sm flex items-center justify-between text-gray-400">
            <div className="cursor-pointer hover:text-blue-300">
              {item.username}
            </div>
            <div className="cursor-pointer hover:text-blue-300">
              {item.type}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
