"use client";
import { CustomButtonProps } from "./CustomButton.props";
import { useRouter } from "next/navigation";

export const CustomButton = ({
  type,
  color,
  text,
  href,
  onClick,
}: CustomButtonProps): React.JSX.Element => {
  const { push } = useRouter();
  const red = href ? () => push(href) : () => {};
  return (
    <button
      className={`h-[60px] w-[181px] rounded-lg hover:shadow-md transition-all ${
        color === "primary" ? "bg-[#7F6BFF] text-[#F3F3F3]" : ""
      }`}
      onClick={red}
      type={type}
    >
      <p className="small-caps font-normal text-[25px]">{text}</p>
    </button>
  );
};
