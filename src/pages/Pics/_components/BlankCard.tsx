import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        className={clsx("rounded-lg w-full h-[239px] bg-cover bg-center")}
      ></div>
      <div>
        <div className="text-[18px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full truncate text-start">
                {CardProps.cardTitle}
              </TooltipTrigger>
              <TooltipContent align="start">
                <p>{CardProps.cardTitle}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-[13px] text-[#999]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-start w-full truncate">
                {CardProps.cardType}
              </TooltipTrigger>
              <TooltipContent align="start">
                <p>{CardProps.cardType}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export { BlankCard };
