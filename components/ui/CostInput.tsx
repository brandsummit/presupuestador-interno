import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "quoteNumber" | "quoteTitle";
};

export default function Input({
  variant = "default",
  className = "",
  ...props
}: Props) {
  const variants = {
    default: "text-sm",
    quoteNumber: "font-display text-3xl font-bold leading-none",
    quoteTitle: "text-lg",
  };

  return (
    <input
      {...props}
      className={`
        w-full
        rounded-lg
        border
        border-input-border/50
        bg-background-transparent
        px-3
        py-2
        text-text
        outline-none
        cursor-text
        placeholder:text-text-muted
        disabled:cursor-not-allowed
        disabled:opacity-60
        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:opacity-60
        [&::-webkit-calendar-picker-indicator]:invert
        ${variants[variant]}
        ${className}
      `}
    />
  );
}