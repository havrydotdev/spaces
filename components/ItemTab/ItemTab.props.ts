import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ItemTabProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  onDelete: () => void;
}
