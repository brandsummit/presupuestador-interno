import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const notoSans = localFont({
  src: [
    {
      path: '../public/fonts/NotoSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NotoSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/NotoSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/NotoSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
})

const optimaNova = localFont({
  src: [
    {
      path: '../public/fonts/OptimaNovaLT-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/OptimaNovaLT-Medium.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Brandsummit Quote',
  description: 'Internal quote system',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${optimaNova.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}