import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Cracks Hospitality platform.',
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
