import { ReactElement } from "react";

export interface AuthButtonProps {
  icon: ReactElement;
  onClick: () => void;
  text: string;
}
