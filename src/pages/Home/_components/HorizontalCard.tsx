import clsx from "clsx";

interface CardProps {
  id: string;
  imgurl: string;
  title: string;
  username: string;
}

const HorizontalCard: React.FC<CardProps & React.ComponentProps<"div">> = ({
  ...CardProps
}) => {
  return (
    <div
      key={CardProps.id}
      className={clsx(
        CardProps.className,
        "bg-white gap-2 flex justify-between p-2 rounded"
      )}
    >
      <div className="flex flex-col justify-between">
        <div className="text-[13px] cursor-pointer hover:text-[#53b2f4]">
          {CardProps.title}
        </div>
        <div className="text-[12px] cursor-pointer hover:text-[#53b2f4] text-gray-400">
          {CardProps.username}
        </div>
      </div>
      <div className="w-[40%] h-[80px]">
        <div
          style={{ backgroundImage: `url(${CardProps.imgurl})` }}
          className={clsx(
            `bg-no-repeat bg-cover bg-center w-full h-full rounded-[6px] cursor-pointer hover:opacity-80`
          )}
        ></div>
      </div>
    </div>
  );
};

export { HorizontalCard };
