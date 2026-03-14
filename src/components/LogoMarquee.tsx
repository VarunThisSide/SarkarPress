"use client";

const logos = [
  { src: "/West-Bengal-300x300.png", alt: "West Bengal Govt" },
  { src: "/WBSEDCL.webp", alt: "WBSEDCL" },
  { src: "/egra.png", alt: "Egra" },
  {
    src: "/national-health-mission-logo-56CB075B4D-seeklogo.com.png",
    alt: "National Health Mission",
  },
  { src: "/balmerol.png", alt: "Balmerol" },
  { src: "/bon.png", alt: "BON" },
];

export default function LogoMarquee() {
  const loop = [...logos, ...logos];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="marquee-logo"
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
}
