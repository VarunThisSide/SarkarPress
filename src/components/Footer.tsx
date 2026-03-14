'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/context/TranslationContext'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Image src="/Logofinal.png" alt="Sarkar Press" width={52} height={52} style={{ objectFit: 'contain' }} />
          <div className="footer-brand-name">SARKAR PRESS</div>
          <p className="footer-brand-desc">{t('hero_subtitle')}</p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="footer-col-title">{t('footer_nav_label')}</div>
          <Link href="/" className="footer-link">{t('footer_home')}</Link>
          <Link href="/about" className="footer-link">{t('nav_about')}</Link>
          <Link href="/orders" className="footer-link">{t('nav_orders')}</Link>
          <Link href="/payments" className="footer-link">{t('nav_payments')}</Link>
          <Link href="/terms" className="footer-link">{t('footer_terms')}</Link>
        </div>

        {/* Contact */}
        <div>
          <div className="footer-col-title">{t('footer_contact_label')}</div>
          <div className="footer-contact-item">
            📞 <a href="tel:+919679091725">+91 96790 91725</a>
          </div>
          <div className="footer-contact-item">
            ✉️ <a href="mailto:sarkarpress.20@gmail.com">sarkarpress.20@gmail.com</a>
          </div>
          <div className="footer-contact-item">
            📍 Patashpur, Purba Medinipur<br />West Bengal 721439
          </div>
          <div className="footer-map" style={{ marginTop: 14 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.826712199891!2d87.53751287601682!3d22.017949753068965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02d2ad505a827b%3A0xf9377693098c3565!2sSarkar%20Colour%20Offset!5e0!3m2!1sen!2sin!4v1715939433556!5m2!1sen!2sin"
              width="220"
              height="140"
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Sarkar Press. All rights reserved.</span>
        <span className="footer-copy">{t('footer_credit')}</span>
      </div>
    </footer>
  )
}
