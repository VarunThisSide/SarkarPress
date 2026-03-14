'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import en from '@/translations/en'
import hi from '@/translations/hi'
import bn from '@/translations/bn'

export type Lang = 'en' | 'hi' | 'bn'
type Translations = typeof en

interface TranslationContextType {
  lang: Lang
  t: (key: keyof Translations) => string
  setLang: (lang: Lang) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  const t = (key: keyof Translations): string => {
    const dict: Record<string, string> =
      lang === 'en' ? en : lang === 'hi' ? hi : bn
    return dict[key] ?? (en[key] as string) ?? key
  }

  return (
    <TranslationContext.Provider value={{ lang, t, setLang }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(TranslationContext)
  if (!ctx) throw new Error('useTranslation must be used inside TranslationProvider')
  return ctx
}
