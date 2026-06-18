import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className = "", ...props }: Props) {
  return (
    <label
      {...props}
      className={`mb-2 block text-base text-text-muted ${className}`}
    />
  );
}