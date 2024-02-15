import clsx from "clsx";

interface CardProps {
  id: string;
  imgurl: string;
  title: string;
  username: string;
  type: string;
}

const Card: React.FC<CardProps & React.ComponentProps<"div">> = ({
  ...CardProps
}) => {
  return (
    <div
      key={CardProps.id}
      className={clsx(
        CardProps.className,
        "border bg-white flex flex-col overflow-hidden h-[200px] rounded-xl"
      )}
    >
      {/* img */}
      <div
        className={`flex-1 rounded-t-xl transition-all overflow-hidden hover:scale-150 duration-300`}
      >
        <div
          className="w-full h-full bg-cover cursor-pointer"
          style={{ backgroundImage: `url(${CardProps.imgurl})` }}
        ></div>
      </div>
      {/* title */}
      <div className="cursor-pointer w-fit ml-2 text-[18px] mr-16 overflow-hidden text-ellipsis">
        {CardProps.title}
      </div>
      {/* footer */}
      <div className="m-2 text-sm flex items-center justify-between text-gray-400">
        <div className="cursor-pointer hover:text-blue-300">
          {CardProps.username}
        </div>
        <div className="cursor-pointer hover:text-blue-300">
          {CardProps.type}
        </div>
      </div>
    </div>
  );
};

export default Card;
