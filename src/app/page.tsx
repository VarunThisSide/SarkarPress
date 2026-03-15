"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/context/TranslationContext";
import AnimatedStat from "@/components/AnimatedStat";
import LogoMarquee from "@/components/LogoMarquee";

const machines = [
  { src: "/xerox-docucolor-240-pic-2-lg.jpg", alt: "Xerox DocuColor" },
  { src: "/PRINTING_MACHINES.webp", alt: "Printing Machine" },
  {
    src: "/fully-automatic-paper-cutting-machine.png",
    alt: "Paper Cutting Machine",
  },
  { src: "/bizhub-808-1200x900.jpg", alt: "Bizhub 808" },
  {
    src: "/epson-surecolor-sc-t5430-500x500-500x500.webp",
    alt: "Epson SureColor",
  },
  {
    src: "/heavy-duty-die-punching-machine-500x500.webp",
    alt: "Die Punching Machine",
  },
];


const serviceKeys = [
  "service1",
  "service2",
  "service3",
  "service4",
  "service5",
  "service6",
  "service7",
  "service8",
  "service9",
] as const;

const featureIcons = ["🖨️", "✨", "⚡", "💰"];

export default function HomePage() {
  const { t } = useTranslation();

  const features = [
    { icon: featureIcons[0], title: t("feat1_title"), desc: t("feat1_desc") },
    { icon: featureIcons[1], title: t("feat2_title"), desc: t("feat2_desc") },
    { icon: featureIcons[2], title: t("feat3_title"), desc: t("feat3_desc") },
    { icon: featureIcons[3], title: t("feat4_title"), desc: t("feat4_desc") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">PATASHPUR · WEST BENGAL</div>
          <h1 className="hero-title">
            <span>{t("hero_title")}</span>
          </h1>
          <p className="hero-subtitle">{t("hero_subtitle")}</p>
          <p className="hero-tagline">{t("hero_tagline")}</p>
          <div className="hero-actions">
            <Link href="/orders" className="btn-primary">
              {t("hero_cta")} →
            </Link>
            <Link href="/about" className="btn-secondary">
              {t("nav_about")}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          <AnimatedStat
            target={50}
            suffix="+"
            label="Years Experience"
            duration={1600}
          />
          <AnimatedStat
            target={5000}
            suffix="+"
            label="Clients Served"
            duration={2000}
          />
          <AnimatedStat
            target={1000000}
            suffix="+"
            label="Prints Delivered"
            duration={1400}
          />
          <AnimatedStat
            target={20}
            suffix="+"
            label="Machines"
            duration={1400}
          />
        </div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">{t("section_why_choose")}</div>
            <h2 className="section-title">{t("section_built_for")}</h2>
            <p className="section-desc">{t("section_quality_speed")}</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MACHINES */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              {t("section_equipment_eyebrow")}
            </div>
            <h2 className="section-title">{t("machines_title")}</h2>
          </div>
          <div className="machines-grid">
            {machines.map((m, i) => (
              <div className="machine-card" key={i}>
                <img src={m.src} alt={m.alt} />
              </div>
            ))}
          </div>
          <p className="machines-more">{t("machines_more")}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">{t("section_what_we_do")}</div>
            <h2 className="section-title">{t("services_title")}</h2>
          </div>
          <div className="services-list">
            {serviceKeys.map((key, i) => (
              <div className="service-card" key={key}>
                <div className="service-number">0{i + 1}</div>
                <div className="service-text">{t(key)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">{t("section_trusted_by")}</div>
            <h2 className="section-title">{t("clients_title")}</h2>
          </div>
          <LogoMarquee />
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="container">
          <h2 className="cta-strip-title">{t("cta_title")}</h2>
          <p className="cta-strip-desc">{t("cta_desc")}</p>
          <Link href="/orders" className="btn-white">
            {t("cta_btn")} &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
