import clsx from "clsx";
interface SubSwitchProps {
  sub: string;
  currentSub: string;
  title: string;
  getSub: (sub: string) => void;
  iconel: () => JSX.Element;
}

const SubSwitch: React.FC<SubSwitchProps> = ({
  sub,
  title,
  currentSub,
  getSub,
  iconel,
}) => {
  return (
    <button
      className={clsx(
        currentSub === sub &&
          "text-sky-300 border border-sky-300 transition-all pl-8",
        "flex gap-2 h-12 text-[15px] items-center cursor-pointer rounded-xl"
      )}
      onClick={() => getSub(sub)}
    >
      {iconel()}
      <span>{title}</span>
    </button>
  );
};

export { SubSwitch };
