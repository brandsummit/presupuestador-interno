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

    textarea.style.height = "38px";
    textarea.style.height = `${textarea.scrollHeight - 0}px`;
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
        min-h-10
        resize-none
        overflow-hidden
        rounded-lg
        border
        border-input-border/50
        bg-background-transparent
        px-3
        py-2
        text-sm
        text-text
        outline-none
        placeholder:text-text-muted
        ${className}
      `}
    />
  );
}