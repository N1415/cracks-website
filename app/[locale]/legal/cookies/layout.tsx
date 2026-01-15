import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for Cracks Hospitality website.',
}

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
