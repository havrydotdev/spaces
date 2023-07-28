export interface CustomButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  color?: "primary" | "white";
  text: string;
  href?: string;
  onClick?: () => void;
}
