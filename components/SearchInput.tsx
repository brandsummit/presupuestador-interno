"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  placeholder?: string;
};

export default function SearchInput({ placeholder = "Search..." }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultValue = searchParams.get("q") || "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex h-11 items-center gap-3 rounded-lg border border-input-border bg-background-light px-4">
      <Search size={16} className="text-text-muted" />

      <input
        defaultValue={defaultValue}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-base text-text outline-none placeholder:text-text-muted"
      />
    </div>
  );
}