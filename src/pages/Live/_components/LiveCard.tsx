import React, { useState } from "react";
import clsx from "clsx";
import { FaPlay } from "react-icons/fa";

type CardProps = {
  liveTitle: string;
  liveId: string;
  liveAuthor: string;
  liveImage: string;
  className?: string;
};

const LiveCard: React.FC<CardProps> = ({ ...CardProps }) => {
  const [showPlayButton, setShowPlayButton] = useState(false);

  return (
    <div
      className="w-[300px] rounded-lg overflow-hidden bg-white cursor-pointer"
      onMouseEnter={() => setShowPlayButton(true)}
      onMouseLeave={() => setShowPlayButton(false)}
    >
      <div
        style={{ backgroundImage: `url(${CardProps.liveImage})` }}
        className={clsx("w-full h-[130px] bg-cover bg-center")}
      >
        {showPlayButton && (
          <div className="bg-gray-300 bg-opacity-50 w-full h-full flex items-center justify-center">
            <button>
              <FaPlay />
            </button>
          </div>
        )}
      </div>
      <div className="px-3 py-2">
        <div className="text-[18px] truncate">{CardProps.liveTitle}</div>
        <div className="text-end text-[13px] text-[#999]">
          {CardProps.liveAuthor}
        </div>
      </div>
    </div>
  );
};

export { LiveCard };
