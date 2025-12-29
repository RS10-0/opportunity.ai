import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Universal Converter ⭐',
  description: 'The instant transformation tool for messy text, notes, and homework.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
