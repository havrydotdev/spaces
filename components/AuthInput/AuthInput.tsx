import { AuthInputProps } from "./AuthInput.props";
import styles from "./AuthInput.module.css";

export const AuthInput = ({
  placeholder,
  type = "text",
  className = "",
}: AuthInputProps): React.JSX.Element => {
  return (
    <input
      name={placeholder.toLowerCase()}
      type={type}
      placeholder={placeholder}
      className={`pointer-events-auto border-[1.5px] rounded-lg border-solid border-[rgba(137,_137,_137,_0.30)] w-[100%] h-[54px] bg-[#F7F7F7] text-[25px] font-medium ${className} ${styles["auth-input"]}`}
    />
  );
};
