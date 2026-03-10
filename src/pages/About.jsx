import { useState, useEffect, useRef } from "react";
import { G, GL, CREAM, WHITE, DARK, MID, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";
import { apiFetch } from "../api";

const FAQS = [
  {
    q: "ImajOnline hansı xidmətləri təqdim edir?",
    a: "İnternet provayderlik, bulud hosting, VPS serverlər, şəbəkə infrastrukturu dizaynı və kibertəhlükəsizlik xidmətləri daxil olmaqla geniş IT həlləri təqdim edirik. Hər xidmət korporativ müştərilərin ehtiyaclarına uyğun olaraq fərdiləşdirilir.",
  },
  {
    q: "Texniki dəstək neçənci saatda əlçatandır?",
    a: "NOC (Şəbəkə Əməliyyat Mərkəzi) komandamız 7/24 monitorinq və texniki dəstək xidməti göstərir. Kritik hadisələr üçün SLA çərçivəsində operativ cavab zəmanəti veririk.",
  },
  {
    q: "Xidmətlərə başlamaq üçün nə etmək lazımdır?",
    a: "Əlaqə forması vasitəsilə və ya birbaşa ofisimizə müraciət edərək pulsuz texniki məsləhət ala bilərsiniz. Mütəxəssislərimiz ehtiyaclarınızı qiymətləndirib ən uyğun paketi tövsiyə edəcək.",
  },
  {
    q: "Korporativ müştərilər üçün fərdi həllər varmı?",
    a: "Bəli. Böyük müəssisələr və dövlət qurumları üçün tam fərdiləşdirilmiş şəbəkə infrastrukturu, xüsusi SLA şərtləri və dedicated texniki komanda ilə xidmət göstəririk.",
  },
];

const QUICK_STATS = [
  { value: "15+", label: "il təcrübə" },
  { value: "500+", label: "korporativ müştəri" },
  { value: "250+", label: "texniki mütəxəssis" },
  { value: "99.9%", label: "uptime zəmanəti" },
];

const VALUES = [
  { title: "Etibarlılıq",      desc: "Şəbəkəmizin 99.9% uptime zəmanəti ilə müştərilərimizin rəqəmsal fəaliyyəti heç vaxt dayanmır. Etibarlılıq bizim əsas öhdəliyimizdir." },
  { title: "İnnovasiya",       desc: "Texnologiyanın sürətli inkişafını izləyərək müştərilərimizə həmişə ən müasir IT həllərini — fiber optikdən cloud-a qədər — təqdim edirik." },
  { title: "Təhlükəsizlik",    desc: "Kibertəhlükəsizlik xidmətlərimiz müştərilərin data və şəbəkə infrastrukturunu 24/7 qoruyur. Güvən bizim prioritetimizdir." },
  { title: "Müştəri yönümlü", desc: "250+ texniki mütəxəssisdən ibarət komandamız müştərilərin IT ehtiyaclarını anında həll etməyə hazırdır. Sizin uğurunuz bizim uğurumuzdur." },
];


function FaqCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(null);

  const goTo = (next) => {
    if (animating || next === active) return;
    setDir(next > active ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, 320);
  };

  const prev = () => goTo(active === 0 ? FAQS.length - 1 : active - 1);
  const next = () => goTo(active === FAQS.length - 1 ? 0 : active + 1);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const item = FAQS[active];

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @keyframes faqSlideIn  { from { opacity: 0; transform: translateX(var(--faq-from)); } to { opacity: 1; transform: translateX(0); } }
        @keyframes faqSlideOut { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(var(--faq-to)); } }
      `}</style>

      {/* Card */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ overflow: "hidden", borderRadius: RADIUS }}
      >
        <div
          key={active}
          style={{
            background: WHITE,
            border: `1px solid rgba(155,53,116,0.2)`,
            borderRadius: RADIUS,
            padding: "3rem 3.5rem",
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            animation: `faqSlideIn 0.32s ease both`,
            "--faq-from": `${dir * 60}px`,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.6rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: G, textTransform: "uppercase" }}>
                Sual {active + 1} / {FAQS.length}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: DARK, marginBottom: "1.2rem", lineHeight: 1.4 }}>
              {item.q}
            </h3>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.92rem", color: MID, lineHeight: 1.9, fontWeight: 300 }}>
              {item.a}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.8rem" }}>
        {/* Dots */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {FAQS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? G : "#ddd",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ display: "flex", gap: "0.6rem" }}>
          {[
            { label: "←", action: prev },
            { label: "→", action: next },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                width: 42, height: 42,
                borderRadius: "50%",
                background: "none",
                border: `1.5px solid #ddd`,
                cursor: "pointer",
                fontFamily: "'Manrope', sans-serif",
                fontSize: "1rem",
                color: DARK,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = G; e.currentTarget.style.borderColor = G; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = DARK; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage({ nav }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let cancelled = false;
    apiFetch("/about-content/").then((d) => { if (!cancelled) setContent(d); }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const coverImg = content?.örtük_şəkil_url || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85";
  const text1    = content?.missiya_mətn_1  || "2009-cu ildə əsası qoyulan ImajOnline, Bakıda kiçik bir internet provayderlik şirkəti kimi fəaliyyətə başladı. 15 il ərzində internet, hosting, şəbəkə infrastrukturu və kibertəhlükəsizlik sahəsində xidmətlərini genişləndirərək Azərbaycanın ən etibarlı IT xidmətlər şirkətinə çevrildik.";
  const text2    = content?.missiya_mətn_2  || "Missiyamız sadədir: biznes və dövlət qurumlarına sürətli internet, etibarlı hosting, güclü şəbəkə infrastrukturu və proaktiv kibertəhlükəsizlik xidmətləri təqdim etmək.";
  const text3    = content?.missiya_mətn_3  || "İnternet provayderlik, bulud hosting, şəbəkə dizaynı və kibertəhlükəsizlik daxil olmaqla bütün əsas IT sahələrində fəaliyyət göstərir, 250+ texniki mütəxəssisdən ibarət daxili komandamızla xidmətləri idarə edirik.";
  const values   = content?.dəyərlər?.map((v) => ({ title: v.başlıq, desc: v.təsvir })) || VALUES;

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="ImajOnline haqqında"
        subtitle="Bizim hekayə"
        img={coverImg}
      />

      {/* ── QUICK STATS BAND ── */}
      <section className="r-sec-xs r-pad" style={{ background: DARK }}>
        <div className="g-quick-stats" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {QUICK_STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "2.5rem", fontWeight: 700, color: G, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginTop: "0.4rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="r-sec r-pad" style={{ background: CREAM }}>
        <div className="g-mission" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ borderLeft: `4px solid ${G}`, paddingLeft: "2rem" }}>
            <Label>Missiyamız</Label>
            <H2 style={{ marginBottom: "1.8rem" }}>
              Azərbaycanın{" "}
              <em style={{ color: G, fontWeight: 400 }}>rəqəmsal infrastrukturunu qururuq</em>
            </H2>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.97rem", marginBottom: "1.4rem", fontWeight: 300 }}>{text1}</p>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.97rem", marginBottom: "1.4rem", fontWeight: 300 }}>{text2}</p>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.97rem", fontWeight: 300 }}>{text3}</p>
          </div>
          <div className="about-img">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=85"
              alt="Data Center"
              style={{ position: "absolute", top: 0, left: 0, width: "73%", height: "77%", objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", borderRadius: RADIUS }}
            />
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80"
              alt="IT Team"
              style={{ position: "absolute", bottom: 0, right: 0, width: "53%", height: "47%", objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: `4px solid ${G}`, borderRadius: RADIUS }}
            />
            <div style={{ position: "absolute", bottom: "2rem", left: "-0.5rem", background: DARK, color: G, padding: "1rem 1.5rem", borderRadius: RADIUS, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}>15+</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", opacity: 0.9 }}>İL IT TƏCRÜBƏSİ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="r-sec r-pad" style={{ background: DARK }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 32, height: 2, background: G }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", letterSpacing: "0.28em", color: G, textTransform: "uppercase" }}>Bizi irəli aparan dəyərlər</span>
            </div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(2rem, 3.5vw, 2.9rem)", fontWeight: 600, color: WHITE }}>Əsas dəyərlərimiz</h2>
          </div>
          <div className="g-values">
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  padding: "2.5rem 2rem",
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(155,53,116,0.25)`,
                  borderRadius: RADIUS,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "0 1 300px",
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `rgba(155,53,116,0.2)`, border: `1.5px solid ${G}`, marginBottom: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: G }} />
                </div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: GL, marginBottom: "0.9rem" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="r-sec r-pad" style={{ background: CREAM }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Label>Tez-tez soruşulan suallar</Label>
            <H2>FAQ</H2>
          </div>
          <FaqCarousel />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="r-sec r-pad" style={{ background: G, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "2rem", fontWeight: 600, color: "#fff", marginBottom: "1rem" }}>
          Bizimlə əməkdaşlığa hazırsınız?
        </h2>
        <p style={{ fontFamily: "'Manrope', sans-serif", color: "rgba(255,255,255,0.85)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Gəlin birlikdə şirkətinizin IT infrastrukturunu gücləndirək.
        </p>
        <button
          onClick={() => nav("contact")}
          style={{ padding: "1rem 2.5rem", background: DARK, color: G, border: "none", borderRadius: RADIUS, fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#333"; e.currentTarget.style.color = GL; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = DARK; e.currentTarget.style.color = G; }}
        >
          Bizimlə əlaqə saxla
        </button>
      </section>
    </div>
  );
}
