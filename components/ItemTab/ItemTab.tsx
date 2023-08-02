import { ItemTabProps } from "./ItemTab.props";
import cn from "classnames";
import TrashIcon from "@/public/trash.svg";

export const ItemTab = ({
  onDelete,
  title,
  className,
  ...props
}: ItemTabProps): React.JSX.Element => {
  return (
    <button
      className={cn(
        "flex items-center text-[18px] h-[41px] w-[325px] rounded-lg text-[#242424] justify-between dir",
        className
      )}
      {...props}
    >
      <p className="ml-[10px]">{title}</p>
      <TrashIcon
        className={`mr-[10px] opacity-0 transition-all cursor-pointer`}
        onClick={onDelete}
      />
    </button>
  );
};
