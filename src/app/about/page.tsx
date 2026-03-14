'use client'

import { useTranslation } from '@/context/TranslationContext'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <h1 className="page-hero-title">{t('about_title')}</h1>
        <p className="page-hero-subtitle">{t('about_tagline')}</p>
      </section>

      {/* About Grid */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-img">
              <img src="/IMG_2305.jpg" alt="Sarkar Press" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="about-content">
              <h2 className="about-title">{t('about_title')}</h2>
              <p className="about-desc">{t('about_desc1')}</p>
              <p className="about-desc">{t('about_desc2')}</p>

              <div className="about-mission-box">
                <div className="about-mission-title">{t('about_missions_title')}</div>
                <div className="about-mission-text">{t('about_mission')}</div>
              </div>

              <div className="about-contact-box">
                <div className="about-contact-title">{t('about_contact_title')}</div>
                <div className="about-contact-item">
                  <span className="about-contact-icon">📞</span>
                  <a href="tel:+919679091725" style={{ color: 'inherit', textDecoration: 'none' }}>{t('about_phone')}</a>
                </div>
                <div className="about-contact-item">
                  <span className="about-contact-icon">✉️</span>
                  <a href="mailto:sarkarpress.20@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>{t('about_email_label')}</a>
                </div>
                <div className="about-contact-item">
                  <span className="about-contact-icon">📍</span>
                  <span>{t('about_address')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">{t('gallery_eyebrow')}</div>
            <h2 className="section-title">{t('gallery_title')}</h2>
          </div>
          <div className="machines-grid">
            {['/pco.jpg', '/pco2.jpg', '/heidelberg-offset-printing-.jpg', '/heidelberg-offset-printing-machines-sm-72-v.jpg', '/IMG_2292.jpg', '/IMG_2298.jpg'].map((src, i) => (
              <div className="machine-card" key={i}>
                <img src={src} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
