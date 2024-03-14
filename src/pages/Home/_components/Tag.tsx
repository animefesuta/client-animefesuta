interface TagProps {
  tagId: string;
  tagValue: string;
  tagColor: string;
}

const Tag: React.FC<TagProps> = ({ tagId, tagValue, tagColor }) => {
  return (
    <button
      style={{
        backgroundColor: tagColor,
      }}
      className="text-white leading-8 h-8 px-[12px] bg-hover rounded-[6px] hover:translate-y-[-3px] cursor-pointer duration-150 hover:!bg-[#53b2f4]"
      onClick={() => {
        console.log(tagId);
      }}
    >
      {tagValue}
    </button>
  );
};
export default Tag;
