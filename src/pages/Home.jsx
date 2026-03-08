import { useState, useEffect, useRef } from "react";
import { G, GL, CREAM, WHITE, DARK, MID, LIGHT, RADIUS } from "../theme";
import { Label, H2 } from "../components/Shared";
import { SERVICES_DATA } from "../data";

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function HomePage({ nav }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const [hov, setHov] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c0 = useCountUp(15,  1800, statsVisible);
  const c1 = useCountUp(500, 1800, statsVisible);
  const c2 = useCountUp(99,  1800, statsVisible);
  const c3 = useCountUp(8,   1800, statsVisible);
  const counts = [c0, c1, c2, c3];
  const stats = [
    { v: 15,  s: "+", l: "İllik təcrübə" },
    { v: 500, s: "+", l: "Korporativ müştəri" },
    { v: 99,  s: ".9%", l: "Şəbəkə uptime" },
    { v: 8,   s: "",  l: "Sənaye mükafatları" },
  ];

  return (
    <div style={{ background: CREAM }}>

      {/* ── HERO ── */}
      <section style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img
          src="/network.png"
          alt="Hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(12,10,8,0.85) 0%, rgba(12,10,8,0.5) 55%, rgba(12,10,8,0.1) 100%)" }} />

        <div className="hero-content" style={{ maxWidth: 780 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem", animation: "fadeUp 1s ease 0.2s both" }}>
            <div style={{ width: 28, height: 1, background: GL }} />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", color: GL, textTransform: "uppercase" }}>
              Esas. 2009 · Bakı, Azərbaycan
            </span>
          </div>

          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(3rem, 6.5vw, 5.8rem)", fontWeight: 700, lineHeight: 1.08, color: "#fff", marginBottom: "1.8rem", animation: "fadeUp 1s ease 0.4s both" }}>
            Azərbaycanı<br />
            <em style={{ color: GL, fontWeight: 400 }}>rəqəmsal dünyaya</em><br />
            bağlayırıq
          </h1>

          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.85, maxWidth: 440, marginBottom: "2.8rem", fontWeight: 300, animation: "fadeUp 1s ease 0.6s both" }}>
            İnternet, hosting, şəbəkə infrastrukturu və kibertəhlükəsizlik xidmətləri ilə biznesinizi rəqəmsal gücə çeviririk.
          </p>

          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", animation: "fadeUp 1s ease 0.8s both" }}>
            <button
              onClick={() => nav("projects")}
              style={{ padding: "1rem 2.5rem", background: G, color: "#fff", border: "none", fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
              onMouseEnter={(e) => (e.target.style.background = "#7D2860")}
              onMouseLeave={(e) => (e.target.style.background = G)}
            >
              Layihələrə bax
            </button>
            <button
              onClick={() => nav("about")}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              <span style={{ display: "block", width: 28, height: 1, background: "currentColor" }} />
              Haqqımızda
            </button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", animation: "fadeIn 2s ease 1.4s both" }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Aşağı sürüşdür</span>
          <div style={{ width: 1, height: 44, background: `linear-gradient(${GL}, transparent)` }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="r-sec-sm r-pad" style={{ background: WHITE, borderBottom: "1px solid #ede8df" }}>
        <div className="g-stats" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {stats.map((s, i) => (
            <div key={s.l}>
              <div style={{ fontFamily: "'Manrope', sans-serif", color: G, fontSize: "3.6rem", lineHeight: 1, fontWeight: 700 }}>{counts[i]}{s.s}</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", color: LIGHT, fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "0.6rem" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="r-sec r-pad" style={{ background: CREAM }}>
        <div className="g-about" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="about-img">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=85" alt="Data Center" style={{ position: "absolute", top: 0, left: 0, width: "72%", height: "76%", objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.13)" }} />
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80" alt="IT Team" style={{ position: "absolute", bottom: 0, right: 0, width: "52%", height: "46%", objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.13)", border: `4px solid ${CREAM}` }} />
            <div style={{ position: "absolute", bottom: "5.5rem", left: "-1.5rem", background: G, padding: "1.4rem 1.8rem", boxShadow: "0 10px 40px rgba(155,53,116,0.3)", borderRadius: RADIUS }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>15+</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.8)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.3rem" }}>İllik IT təcrübəsi</div>
            </div>
          </div>
          <div>
            <Label>Biz kimik</Label>
            <H2 style={{ marginBottom: "1.6rem" }}>
              Rəqəmsal infrastrukturun<br />
              <em style={{ color: G, fontWeight: 400 }}>2009-cu ildən etibarlı tərəfdaşı</em>
            </H2>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.95rem", marginBottom: "1.2rem", fontWeight: 300 }}>
              ImajOnline Azərbaycanın aparıcı IT xidmətlər şirkətidir — ölkənin rəqəmsal infrastrukturunu müəyyən edən internet provayderlik, bulud hosting, şəbəkə həlləri və kibertəhlükəsizlik xidmətləri göstərir.
            </p>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.95rem", marginBottom: "2.5rem", fontWeight: 300 }}>
              250-dən çox texniki mütəxəssis və 15 illik təcrübə ilə regionda dövlət qurumlarının, bankların və biznes şirkətlərinin etibarlı IT tərəfdaşıyıq.
            </p>
            <button
              onClick={() => nav("about")}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", borderBottom: `1.5px solid ${G}`, paddingBottom: "0.3rem", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: G }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Hekayəmizi kəşf edin →
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES SNIPPET ── */}
      <section className="r-sec r-pad" style={{ background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="g-svc-header">
            <div><Label>Nə edirik</Label><H2>Xidmətlərimiz</H2></div>
            <button onClick={() => nav("services")} style={{ background: "none", border: "none", borderBottom: `1.5px solid ${G}`, paddingBottom: "0.2rem", cursor: "pointer", fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: G, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
              Bütün xidmətlərə bax →
            </button>
          </div>
          <div className="g-services">
            {SERVICES_DATA.map((s, i) => (
              <div
                key={s.id}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                onClick={() => nav("services")}
                style={{ background: hov === i ? DARK : WHITE, transition: "all 0.35s", cursor: "pointer", borderRadius: RADIUS, padding: "2.2rem 1.8rem", border: "1px solid #ede8df", borderBottom: hov === i ? `3px solid ${G}` : "1px solid #ede8df" }}
              >
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1rem", fontWeight: 600, color: hov === i ? "#fff" : DARK, marginBottom: "0.5rem", transition: "color 0.35s" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: hov === i ? "rgba(255,255,255,0.55)" : "#999", fontWeight: 300, transition: "color 0.35s" }}>{s.short}</p>
                <div style={{ marginTop: "1.4rem", fontFamily: "'Manrope', sans-serif", fontSize: "0.72rem", color: hov === i ? G : "transparent", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.35s" }}>
                  Qiymətlərə bax →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="r-sec r-pad" style={{ background: DARK, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=70)`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
        <div className="g-cta" style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "#fff", marginBottom: "0.8rem" }}>
              <em style={{ color: GL }}>Etibarlı</em> IT tərəfdaşı axtarırsınız?
            </h2>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: "#888", fontSize: "0.95rem", fontWeight: 300 }}>Komandamız şirkətinizin rəqəmsal infrastrukturunu qurmağa hazırdır.</p>
          </div>
          <button
            onClick={() => nav("contact")}
            style={{ padding: "1.1rem 3rem", background: G, color: "#fff", border: "none", fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", flexShrink: 0, transition: "background 0.3s" }}
            onMouseEnter={(e) => (e.target.style.background = "#7D2860")}
            onMouseLeave={(e) => (e.target.style.background = G)}
          >
            Bizimlə əlaqə saxla
          </button>
        </div>
      </section>
    </div>
  );
}
