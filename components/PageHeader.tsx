import { ReactNode } from 'react'
import Button from '@/components/Button'

type PageHeaderProps = {
  title: string
  buttonText?: string
  icon?: ReactNode
}

export default function PageHeader({
  title,
  buttonText,
  icon,
}: PageHeaderProps) {
  return (
    <header className="mb-10 flex items-center justify-between">
      <div>
        <h2 className="text-4xl font-display font-bold">{title}</h2>
      </div>

      {buttonText && (
        <Button icon={icon}>
          {buttonText}
        </Button>
      )}
    </header>
  )
}