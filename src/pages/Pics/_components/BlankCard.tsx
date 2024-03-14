import clsx from "clsx";

interface CardProps {
  cardTitle: string;
  cardId: string;
  cardType: string;
  cardUrl: string;
}

const BlankCard: React.FC<CardProps> = ({ ...CardProps }) => {
  return (
    <div className="w-[180px] h-[300px] cursor-pointer">
      <div
        style={{ backgroundImage: `url(${CardProps.cardUrl})` }}
        className={clsx("w-full h-[239px] bg-cover bg-center")}
      ></div>
      <div>
        <div className="text-[18px]">{CardProps.cardTitle}</div>
        <div className="text-[13px] text-[#999]">{CardProps.cardType}</div>
      </div>
    </div>
  );
};

export { BlankCard };
