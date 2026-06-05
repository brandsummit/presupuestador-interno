import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        rounded-lg
        bg-background-light
        p-5
        ${className}
      `}
    >
      {children}
    </div>
  );
}