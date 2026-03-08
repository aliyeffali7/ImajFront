import { useState } from "react";
import { G, GL, CREAM, RADIUS } from "../theme";
import { Label, H2, PageHero, CategoryBadge } from "../components/Shared";
import { PROJECTS } from "../data";

const CATEGORIES = ["Hamısı", "Şəbəkə", "Bulud", "Kibertəhlükəsizlik", "İdarəetmə"];

export default function ProjectsPage({ nav }) {
  const [filter, setFilter]   = useState("Hamısı");
  const [hov,    setHov]      = useState(null);
  const [status, setStatus]   = useState("Hamısı");

  const filtered = PROJECTS.filter((p) => {
    const catOk    = filter === "Hamısı" || p.category === filter;
    const statusOk = status === "Hamısı" || p.status === status;
    return catOk && statusOk;
  });

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="Layihələrimiz"
        subtitle="Portfel"
        img="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85"
      />

      <section style={{ padding: "6rem 4rem", background: CREAM }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Filters */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <Label>Bütün işlər</Label>
              <H2>Layihə portfeli</H2>
            </div>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              {/* Category */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    style={{
                      padding: "0.5rem 1.2rem",
                      border: "1.5px solid",
                      borderColor: filter === c ? G : "#ddd",
                      background: filter === c ? G : "transparent",
                      color: filter === c ? "#fff" : "#888",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.72rem", fontWeight: 500,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      cursor: "pointer", transition: "all 0.3s",
                      borderRadius: RADIUS,
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {/* Status */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["Hamısı", "Tamamlanmış", "Davam edir"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    style={{
                      padding: "0.5rem 1.1rem",
                      border: "1.5px solid",
                      borderColor: status === s ? "#555" : "#ddd",
                      background: status === s ? "#555" : "transparent",
                      color: status === s ? "#fff" : "#aaa",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.68rem", fontWeight: 500,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      cursor: "pointer", transition: "all 0.3s",
                      borderRadius: RADIUS,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Count */}
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "#aaa", marginBottom: "2rem" }}>
            {filtered.length} layihə göstərilir
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "280px", gap: "1.2rem" }}>
            {filtered.map((p, i) => (
              <div
                key={p.id}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                onClick={() => nav("project", p.id)}
                style={{ position: "relative", overflow: "hidden", gridRow: p.featured ? "span 2" : "span 1", cursor: "pointer", borderRadius: RADIUS }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", transform: hov === i ? "scale(1.06)" : "scale(1)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: hov === i ? "linear-gradient(transparent 25%, rgba(15,10,5,0.85))" : "linear-gradient(transparent 50%, rgba(15,10,5,0.68))", transition: "all 0.4s" }} />

                <CategoryBadge label={p.category} />

                {p.status === "Davam edir" && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", padding: "0.28rem 0.75rem", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.6rem", color: "#fff", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Davam edir</span>
                  </div>
                )}

                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", transform: hov === i ? "translateY(0)" : "translateY(4px)", transition: "transform 0.4s" }}>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", color: GL, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    {p.location} · {p.year}
                  </div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: p.featured ? "1.5rem" : "1.15rem", color: "#fff", fontWeight: 600 }}>
                    {p.title}
                  </div>
                  {hov === i && (
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", marginTop: "0.4rem" }}>
                      Layihə detalları →
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: "#aaa" }}>
              Mövcud filtr parametrlərinə uyğun layihə tapılmadı.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
