import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  className = "",
  ...props
}: Props) {
  return (
    <textarea
      {...props}
      className={`
        min-h-30
        w-full
        rounded-lg
        border
        border-input-border
        bg-background-light/30
        px-4
        py-3
        text-sm
        text-text
        outline-none
        placeholder:text-text-muted
        resize-none
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    />
  );
}