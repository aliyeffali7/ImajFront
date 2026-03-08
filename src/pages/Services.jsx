import { useState } from "react";
import { G, CREAM, WHITE, DARK, MID, LIGHT, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";
import { SERVICES_DATA } from "../data";

const CHECK = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="7.5" cy="7.5" r="7.5" fill={G} fillOpacity="0.15" />
    <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={G} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CHECK_WHITE = (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="7.5" cy="7.5" r="7.5" fill="rgba(255,255,255,0.2)" />
    <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  internet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  hosting: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  ssl: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  vps: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
};

const PROCESS = [
  { t: "Ehtiyac analizi",  d: "İT infrastruktur ehtiyaclarınızı, mövcud sistemlərinizi və hədəflərinizi dərindən öyrənirik." },
  { t: "Həll dizaynı",     d: "Mütəxəssislərimiz optimal şəbəkə arxitekturası və IT həll planını hazırlayır." },
  { t: "Quraşdırma",       d: "Sertifikatlı texniki komandamız avadanlıqların quraşdırılması və konfiqurasiyasını həyata keçirir." },
  { t: "Test və sınaq",    d: "Bütün sistemlər hərtərəfli yük testindən keçirilir, performans standartlarına uyğunluğu yoxlanılır." },
  { t: "24/7 Dəstək",      d: "NOC monitorinq, texniki dəstək xidməti və proaktiv sistem idarəetmə ilə davamlı xidmət." },
];

export default function ServicesPage({ nav }) {
  const [active, setActive] = useState(0);
  const svc = SERVICES_DATA[active];

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="Xidmətlərimiz"
        subtitle="Nələri təqdim edirik"
        img="/xidmetler.png"
      />

      {/* ── CATEGORY TABS ── */}
      <section style={{ background: WHITE, borderBottom: "1px solid #ede8df", position: "sticky", top: 72, zIndex: 100 }}>
        <div className="tabs-wrap r-pad" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {SERVICES_DATA.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "1.2rem 1.8rem",
                background: "none",
                border: "none",
                borderBottom: active === i ? `2.5px solid ${G}` : "2.5px solid transparent",
                cursor: "pointer",
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.78rem",
                fontWeight: active === i ? 700 : 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: active === i ? G : "#888",
                transition: "all 0.25s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (active !== i) e.currentTarget.style.color = DARK; }}
              onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.color = "#888"; }}
            >
              <span style={{ color: active === i ? G : "#bbb", transition: "color 0.25s" }}>
                {ICONS[s.id]}
              </span>
              {s.title}
            </button>
          ))}
        </div>
      </section>

      {/* ── SERVICE HEADER ── */}
      <section className="r-sec-sm r-pad" style={{ background: CREAM, paddingBottom: "3.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 680 }}>
            <Label>{svc.title}</Label>
            <H2 style={{ marginBottom: "1.2rem" }}>{svc.title}</H2>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.9, fontSize: "0.97rem", fontWeight: 300 }}>
              {svc.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="r-pad" style={{ background: CREAM, paddingBottom: "7rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="g-pricing" style={{
            display: "grid",
            gridTemplateColumns: `repeat(${svc.packages.length}, 1fr)`,
            gap: "1.25rem",
            alignItems: "end",
          }}>
            {svc.packages.map((pkg) => (
              <PricingCard key={pkg.name} pkg={pkg} nav={nav} />
            ))}
          </div>

          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.76rem", color: LIGHT, textAlign: "center", marginTop: "2rem" }}>
            * Qiymətlərə ƏDV daxil deyil. Korporativ paketlər üçün fərdi təklif almaq üçün bizimlə əlaqə saxlayın.
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="r-sec r-pad" style={{ background: WHITE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Label>Necə işləyirik</Label>
            <H2>Xidmət prosesimiz</H2>
          </div>
          <div className="g-process">
            {PROCESS.map((step, i) => (
              <div key={i} style={{ textAlign: "center", padding: "2rem 1rem", background: CREAM, borderRadius: RADIUS }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: DARK, marginBottom: "0.6rem" }}>{step.t}</div>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: LIGHT, lineHeight: 1.7, fontWeight: 300 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ pkg, nav }) {
  const [hov, setHov] = useState(false);
  const { highlighted } = pkg;

  const bg      = highlighted ? G      : WHITE;
  const textCol = highlighted ? "#fff" : DARK;
  const subCol  = highlighted ? "rgba(255,255,255,0.65)" : LIGHT;
  const divider = highlighted ? "rgba(255,255,255,0.2)" : "#ede8df";
  const shadow  = highlighted
    ? `0 24px 60px ${G}45`
    : hov ? "0 12px 40px rgba(0,0,0,0.1)" : "0 2px 16px rgba(0,0,0,0.05)";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg,
        border: highlighted ? "none" : "1px solid #ede8df",
        borderRadius: RADIUS,
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        boxShadow: shadow,
        transition: "box-shadow 0.3s, transform 0.3s",
        transform: highlighted ? "translateY(-8px)" : hov ? "translateY(-3px)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Badge */}
      {pkg.badge && (
        <div style={{
          position: "absolute", top: "1.2rem", right: "1.2rem",
          background: highlighted ? "rgba(255,255,255,0.22)" : G,
          color: "#fff",
          padding: "0.22rem 0.65rem",
          borderRadius: RADIUS,
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          {pkg.badge}
        </div>
      )}

      {/* Name + specs */}
      <div style={{ marginBottom: "1.6rem" }}>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: textCol, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
          {pkg.name}
        </div>
        <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.76rem", color: subCol, fontWeight: 400 }}>
          {pkg.specs}
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: "1.8rem", paddingBottom: "1.8rem", borderBottom: `1px solid ${divider}` }}>
        {pkg.price ? (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.3rem" }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "3.2rem", fontWeight: 800, color: highlighted ? "#fff" : G, lineHeight: 1 }}>
              {pkg.price}
            </span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: subCol, marginBottom: "0.45rem" }}>
              {pkg.unit}
            </span>
          </div>
        ) : (
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: highlighted ? "#fff" : G, lineHeight: 1.3 }}>
            {pkg.priceLabel}
          </div>
        )}
      </div>

      {/* Features */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>
        {pkg.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
            {highlighted ? CHECK_WHITE : CHECK}
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.83rem", color: highlighted ? "rgba(255,255,255,0.88)" : MID, lineHeight: 1.5, fontWeight: 300 }}>
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => nav("contact")}
        style={{
          width: "100%",
          padding: "0.9rem",
          background: highlighted ? "#fff" : G,
          color: highlighted ? G : "#fff",
          border: "none",
          borderRadius: RADIUS,
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.76rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Müraciət et
      </button>
    </div>
  );
}
