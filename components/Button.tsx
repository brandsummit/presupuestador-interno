import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  icon?: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({
  children,
  icon,
  variant = 'primary',
}: ButtonProps) {
  const variants = {
    primary:
      'border border-text bg-text text-background hover:brightness-90',

    secondary:
      'border border-input-border hover:border-text hover:bg-text hover:text-background-light',

    danger:
      'border border-danger text-danger hover:bg-danger hover:text-background',

    noBorderDanger:
      'text-danger hover:bg-danger hover:text-background',
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm ${variants[variant]}`}
    >
      {icon}
      {children}
    </button>
  )
}