import { ChangeEvent, ClassAttributes, LegacyRef } from "react";

export interface AuthInputProps {
  placeholder: string;
  type?: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value: string;
}
