import { AuthButtonProps } from "./AuthButton.props";

export const AuthButton = ({
  text,
  onClick,
  icon,
}: AuthButtonProps): React.JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="block box-border text-[25px] tracking-1 border-[1.5px] border-solid border-[#D6D6D6] rounded-lg bg-[#F7F7F7] uppercase font-medium h-[60px] w-[100%] max-sm:w-[60px] hover:shadow-md transition-shadow"
    >
      <div className="flex gap-[18px] small-caps mx-auto max-sm:justify-center">
        <div className="flex flex-col sm:justify-center sm:ml-[27px] max-sm:align-middle">
          {icon}
        </div>{" "}
        <p className="max-sm:hidden">{text}</p>
      </div>
    </button>
  );
};
