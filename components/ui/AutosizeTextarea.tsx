"use client";

import {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function AutosizeTextarea({
  className = "",
  onInput,
  ...props
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const textarea = ref.current;

    if (!textarea) return;

    textarea.style.height = "48px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    resize();
  }, []);

  return (
    <textarea
      {...props}
      ref={ref}
      rows={1}
      onInput={(event) => {
        resize();
        onInput?.(event);
      }}
      className={`
        w-full
        min-h-12
        resize-none
        overflow-hidden
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
        ${className}
      `}
    />
  );
}