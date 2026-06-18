import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`
          w-full
          appearance-none
          rounded-lg
          border
          border-input-border
          bg-background-light/30
          px-4
          py-3
          pr-10
          text-base
          text-text
          outline-none
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${className}
        `}
      >
        {children}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
      />
    </div>
  );
}