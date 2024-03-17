import clsx from "clsx";
interface SubSwitchProps {
  sub: number;
  currentSub: number;
  getSub: (sub: number) => void;
  iconel: () => JSX.Element;
}

const SubSwitch: React.FC<SubSwitchProps> = ({
  sub,
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
      <span>推荐</span>
    </button>
  );
};

export { SubSwitch };
