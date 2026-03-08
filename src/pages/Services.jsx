import { useState } from "react";
import { G, CREAM, WHITE, DARK, MID, LIGHT, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";
import { SERVICES_DATA } from "../data";

const PROCESS = [
  { t: "Ehtiyac analizi",  d: "Müştərinin IT infrastruktur ehtiyaclarını, mövcud sistemlərini və hədəflərini dərindən öyrənirik." },
  { t: "Həll dizaynı",     d: "Mütəxəssislərimiz optimal şəbəkə arxitekturası və IT həll planını hazırlayır." },
  { t: "Quraşdırma",       d: "Sertifikatlı texniki komandamız avadanlıqların quraşdırılması və konfiqurasiyasını həyata keçirir." },
  { t: "Test və sınaq",    d: "Bütün sistemlər hərtərəfli yük testindən keçirilir, performans standartlarına uyğunluğu yoxlanılır." },
  { t: "24/7 Dəstək",      d: "NOC monitorinq, texniki dəstək xidməti və proaktiv sistem idarəetmə ilə davamlı xidmət." },
];

export default function ServicesPage({ nav }) {
  const [active, setActive] = useState(0);
  const s = SERVICES_DATA[active];

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="Xidmətlərimiz"
        subtitle="Nələri təqdim edirik"
        img="/xidmetler.png"
      />

      {/* ── SERVICE TABS ── */}
      <section style={{ background: WHITE, padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "4rem" }}>

            {/* Sidebar */}
            <div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", color: G, textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 600 }}>
                Xidməti seçin
              </div>
              {SERVICES_DATA.map((svc, i) => (
                <button
                  key={svc.id}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    width: "100%", padding: "1rem 1.2rem",
                    background: active === i ? DARK : "transparent",
                    border: "none",
                    borderLeft: active === i ? `3px solid ${G}` : "3px solid transparent",
                    cursor: "pointer", textAlign: "left",
                    transition: "all 0.3s", marginBottom: "0.3rem",
                    borderRadius: RADIUS,
                  }}
                >
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem", fontWeight: active === i ? 600 : 400, color: active === i ? "#fff" : MID, transition: "color 0.3s" }}>
                    {svc.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div>
              <div style={{ position: "relative", marginBottom: "2.5rem", overflow: "hidden", borderRadius: RADIUS }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: 360, objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: G, padding: "0.4rem 1rem", borderRadius: RADIUS }}>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", color: "#fff", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {s.title}
                  </span>
                </div>
              </div>

              <Label>{s.title}</Label>
              <H2 style={{ marginBottom: "1.5rem" }}>{s.title}</H2>
              <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.9, fontSize: "0.97rem", marginBottom: "2.5rem", fontWeight: 300 }}>{s.desc}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2.5rem" }}>
                {s.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem", color: DARK }}>
                    <div style={{ width: 6, height: 6, background: G, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={() => nav("contact")}
                style={{ padding: "0.9rem 2.2rem", background: G, color: "#fff", border: "none", borderRadius: RADIUS, fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                onMouseEnter={(e) => (e.target.style.background = "#7D2860")}
                onMouseLeave={(e) => (e.target.style.background = G)}
              >
                Bu xidmətlə bağlı sorğu göndər
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES GRID ── */}
      <section style={{ background: CREAM, padding: "6rem 4rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Label>Ümumi baxış</Label>
            <H2>Bütün təklif etdiklərimiz</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {SERVICES_DATA.map((svc) => (
              <div
                key={svc.id}
                onClick={() => { setActive(SERVICES_DATA.indexOf(svc)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ background: WHITE, cursor: "pointer", borderBottom: `3px solid transparent`, transition: "border-color 0.3s", borderRadius: RADIUS, overflow: "hidden" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = G)}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
              >
                <div style={{ position: "relative", overflow: "hidden", height: 180 }}>
                  <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "1.8rem 2rem 2rem" }}>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: DARK, marginBottom: "0.75rem" }}>{svc.title}</h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem", color: LIGHT, lineHeight: 1.75, fontWeight: 300 }}>{svc.short}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: WHITE, padding: "4rem 4rem 8rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Label>Necə işləyirik</Label>
            <H2>Xidmət prosesimiz</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem" }}>
            {PROCESS.map((step, i) => (
              <div key={i} style={{ textAlign: "center", padding: "1.5rem 0.75rem", background: CREAM, borderRadius: RADIUS }}>
                <div style={{ width: 24, height: 3, background: G, margin: "0 auto 1.2rem", borderRadius: 2 }} />
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1rem", fontWeight: 600, color: DARK, marginBottom: "0.6rem" }}>{step.t}</div>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: LIGHT, lineHeight: 1.7, fontWeight: 300 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
