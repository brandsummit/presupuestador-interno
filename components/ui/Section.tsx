import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Section({
  title,
  children,
}: Props) {
  return (
    <section className="rounded-lg bg-background-light p-6">
      <h2 className="mb-4 text-xl font-display font-bold text-text">
        {title}
      </h2>

      {children}
    </section>
  );
}