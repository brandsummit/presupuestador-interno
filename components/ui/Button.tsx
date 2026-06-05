import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "success" | "danger" | "ghost";
};

export default function Button({
  variant = "default",
  className = "",
  ...props
}: Props) {
  const variants = {
    default:
      "border-input-border text-text hover:border-text hover:bg-text hover:text-background",
    success:
      "border-success bg-success text-background hover:bg-background-light hover:text-success",
    danger:
      "border-danger text-danger hover:bg-danger hover:text-background",
    ghost:
      "border-transparent text-text-muted hover:text-text",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        px-3
        py-2
        text-sm
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    />
  );
}