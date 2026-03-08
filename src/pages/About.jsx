import { G, GL, CREAM, WHITE, DARK, MID, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";

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

const TIMELINE = [
  { year: "2009", title: "Şirkətin əsası",         desc: "ImajOnline Bakı şəhərində 8 nəfərlik texniki komanda ilə internet provayderlik xidmətləri göstərərək fəaliyyətə başladı." },
  { year: "2012", title: "Korporativ genişlənmə",  desc: "İlk korporativ müştərilər əldə edildi. Bakı biznes mərkəzlərinə dedicated internet xidmətləri göstərilməyə başlandı." },
  { year: "2016", title: "BakuCloud Hub açıldı",   desc: "Azərbaycanda ilk Tier III sertifikatlı kommersiya data mərkəzi fəaliyyətə başladı. Bulud hosting xidmətləri təqdim edildi." },
  { year: "2019", title: "CityFiber Baku",         desc: "FTTH layihəsi ilə 200,000-dən çox abunəçiyə fiber internet xidmətinin çatdırılması başlandı. Şəbəkə kapasitəsi 10x artırıldı." },
  { year: "2022", title: "Kibertəhlükəsizlik",     desc: "CyberShield xidmətləri təqdim edildi. Dövlət və özəl sektor üçün kompleks kibertəhlükəsizlik həllərinin lideri oldu." },
  { year: "2025", title: "Bu gün",                 desc: "250+ texniki mütəxəssis, 500+ korporativ müştəri və Azərbaycanın ən etibarlı IT xidmətlər tərəfdaşı." },
];

export default function AboutPage({ nav }) {
  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="ImajOnline haqqında"
        subtitle="Bizim hekayə"
        img="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85"
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
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.97rem", marginBottom: "1.4rem", fontWeight: 300 }}>
              2009-cu ildə əsası qoyulan ImajOnline, Bakıda kiçik bir internet provayderlik şirkəti kimi fəaliyyətə başladı. 15 il ərzində internet, hosting, şəbəkə infrastrukturu və kibertəhlükəsizlik sahəsində xidmətlərini genişləndirərək Azərbaycanın ən etibarlı IT xidmətlər şirkətinə çevrildik.
            </p>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.97rem", marginBottom: "1.4rem", fontWeight: 300 }}>
              Missiyamız sadədir: biznes və dövlət qurumlarına sürətli internet, etibarlı hosting, güclü şəbəkə infrastrukturu və proaktiv kibertəhlükəsizlik xidmətləri təqdim etmək.
            </p>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "0.97rem", fontWeight: 300 }}>
              İnternet provayderlik, bulud hosting, şəbəkə dizaynı və kibertəhlükəsizlik daxil olmaqla bütün əsas IT sahələrində fəaliyyət göstərir, 250+ texniki mütəxəssisdən ibarət daxili komandamızla xidmətləri idarə edirik.
            </p>
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
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                style={{
                  padding: "2.5rem 2rem",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.06)" : "transparent",
                  border: `1px solid rgba(155,53,116,0.25)`,
                  borderRadius: RADIUS,
                }}
              >
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: i % 2 === 0 ? GL : WHITE, marginBottom: "0.9rem" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="r-sec r-pad" style={{ background: CREAM }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 32, height: 2, background: G }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", letterSpacing: "0.28em", color: G, textTransform: "uppercase" }}>Səyahətimiz</span>
            </div>
            <H2>Şirkət tarixçəsi</H2>
          </div>
          <div style={{ position: "relative", paddingLeft: "2rem", borderLeft: `3px solid ${G}` }}>
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{ position: "relative", marginBottom: "2.5rem" }}>
                <div style={{ position: "absolute", left: "calc(-2rem - 8px)", top: 4, width: 16, height: 16, background: G, borderRadius: "50%", border: `3px solid ${CREAM}` }} />
                <div className="timeline-grid" style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "1.5rem", alignItems: "start", background: i % 2 === 0 ? WHITE : "transparent", padding: "1.5rem 2rem", borderRadius: RADIUS, border: i % 2 === 0 ? `1px solid rgba(155,53,116,0.2)` : "none" }}>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: DARK }}>{item.year}</div>
                  <div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: DARK, marginBottom: "0.5rem" }}>{item.title}</div>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.9rem", color: MID, lineHeight: 1.8, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
