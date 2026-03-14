import type { Metadata } from 'next'
import '@/styles/globals.css'
import { TranslationProvider } from '@/context/TranslationContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sarkar Press — Modern Printing Solutions',
  description: 'Sarkar Press is a super speciality modern printing company in Patashpur, West Bengal. Offset, digital, flex, and customized printing with unmatched quality.',
  keywords: 'printing press, offset printing, digital printing, flex printing, West Bengal, Patashpur',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TranslationProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  )
}
