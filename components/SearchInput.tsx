type SearchInputProps = {
  placeholder: string
}

export default function SearchInput({
  placeholder,
}: SearchInputProps) {
  return (
    <div className="mb-6">
      <input
        className="w-full rounded-lg border border-input-border text-text px-4 py-4 text-sm outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}