'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useTranslation, type Lang } from '@/context/TranslationContext'

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
]

export default function Navbar() {
  const { t, lang, setLang } = useTranslation()
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: '/about', label: t('nav_about') },
    { href: '/orders', label: t('nav_orders') },
    { href: '/payments', label: t('nav_payments') },
  ]

  const currentLang = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <Image src="/Logofinal.png" alt="Sarkar Press Logo" width={44} height={44} style={{ objectFit: 'contain' }} />
          <span className="navbar-logo-text">SARKAR PRESS</span>
        </Link>

        <nav className="navbar-links">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link${pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Dropdown */}
          <div className="lang-dropdown" ref={dropdownRef}>
            <button
              className="lang-btn"
              onClick={() => setDropdownOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <span className={`lang-chevron${dropdownOpen ? ' open' : ''}`}>▾</span>
            </button>
            {dropdownOpen && (
              <ul className="lang-menu" role="listbox">
                {LANGUAGES.map(l => (
                  <li
                    key={l.code}
                    role="option"
                    aria-selected={lang === l.code}
                    className={`lang-option${lang === l.code ? ' selected' : ''}`}
                    onClick={() => { setLang(l.code); setDropdownOpen(false) }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && <span className="lang-check">✓</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
