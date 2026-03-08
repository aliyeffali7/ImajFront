import { useState } from "react";
import { G, GL, CREAM, WHITE, DARK, MID, LIGHT, RADIUS } from "../theme";
import { Label, H2, CategoryBadge } from "../components/Shared";
import { PROJECTS } from "../data";

export default function ProjectDetailPage({ projectId, nav }) {
  const p = PROJECTS.find((x) => x.id === projectId) || PROJECTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const [hov, setHov] = useState(null);

  const related = PROJECTS.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 3);

  return (
    <div style={{ background: CREAM }}>

      {/* ── HERO IMAGE ── */}
      <div style={{ height: "70vh", position: "relative", overflow: "hidden" }}>
        <img
          src={p.gallery[activeImg]}
          alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 30%, rgba(12,8,4,0.78))" }} />

        {/* Back button */}
        <button
          onClick={() => nav("projects")}
          style={{
            position: "absolute", top: "6rem", left: "4rem",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "0.6rem 1.4rem", color: "#fff",
            fontFamily: "'Manrope', sans-serif", fontSize: "0.75rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem",
            transition: "background 0.3s",
            borderRadius: RADIUS,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
        >
          ← Bütün layihələr
        </button>

        {/* Title */}
        <div style={{ position: "absolute", bottom: "3rem", left: "4rem" }}>
          <div style={{ display: "inline-block", background: G, padding: "0.3rem 0.9rem", marginBottom: "1rem", borderRadius: RADIUS }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", color: "#fff", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {p.category}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
            {p.title}
          </h1>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginTop: "0.6rem" }}>
            {p.location} · İl: {p.year}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div style={{ position: "absolute", bottom: "3rem", right: "4rem", display: "flex", gap: "0.6rem" }}>
          {p.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              style={{
                width: 72, height: 50, overflow: "hidden", padding: 0, cursor: "pointer",
                border: activeImg === i ? `2px solid ${G}` : "2px solid rgba(255,255,255,0.2)",
                transition: "border-color 0.3s",
                borderRadius: RADIUS,
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: RADIUS - 2 }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── PROJECT INFO ── */}
      <section style={{ padding: "6rem 4rem", background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", gap: "5rem" }}>

          <div>
            <Label>Layihəyə ümumi baxış</Label>
            <H2 style={{ marginBottom: "1.8rem" }}>{p.title}</H2>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.95, fontSize: "1rem", fontWeight: 300 }}>
              {p.desc}
            </p>
          </div>

          {/* Facts card */}
          <div style={{ background: CREAM, padding: "2.5rem", borderRadius: RADIUS }}>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.68rem", letterSpacing: "0.25em", color: G, textTransform: "uppercase", marginBottom: "1.8rem", fontWeight: 600 }}>
              Layihə haqqında məlumat
            </div>
            {[
              ["Kateqoriya",  p.category],
              ["Məkan",       p.location],
              ["İl",          p.year],
              ["Miqyas",      p.area],
              ["Texnologiya", p.floors],
              ["Status",      p.status],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.9rem 0", borderBottom: "1px solid #ede8df" }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: LIGHT }}>{k}</span>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: DARK, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={() => nav("contact")}
                style={{ width: "100%", padding: "0.9rem", background: G, color: "#fff", border: "none", fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                onMouseEnter={(e) => (e.target.style.background = "#7D2860")}
                onMouseLeave={(e) => (e.target.style.background = G)}
              >
                Bu layihə ilə bağlı sorğu göndər
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "0 4rem 6rem", background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <Label>Qalereya</Label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {p.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImg(i)}
                style={{ overflow: "hidden", cursor: "pointer", border: activeImg === i ? `3px solid ${G}` : "3px solid transparent", transition: "border-color 0.3s", borderRadius: RADIUS }}
              >
                <img
                  src={img}
                  alt=""
                  style={{ width: "100%", height: 220, objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ── */}
      {related.length > 0 && (
        <section style={{ background: CREAM, padding: "6rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ marginBottom: "3rem" }}>
                  <Label>Digər işlər</Label>
                  <H2>Oxşar layihələr</H2>
                </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }}>
              {related.map((rp, i) => (
                <div
                  key={rp.id}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  onClick={() => { nav("project", rp.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ position: "relative", overflow: "hidden", cursor: "pointer", paddingBottom: "65%", borderRadius: RADIUS }}
                >
                  <img src={rp.img} alt={rp.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov === i ? "scale(1.05)" : "scale(1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 45%, rgba(12,8,4,0.72))" }} />
                  <div style={{ position: "absolute", bottom: "1.2rem", left: "1.2rem" }}>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.6rem", color: GL, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{rp.location}</div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.1rem", color: "#fff", fontWeight: 600 }}>{rp.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
