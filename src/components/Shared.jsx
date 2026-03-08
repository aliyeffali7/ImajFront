import { useState } from "react";
import { G, GL, CREAM, DARK, MID, RADIUS } from "../theme";

export function Label({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
      <div style={{ width: 28, height: 1.5, background: G, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", letterSpacing: "0.28em", color: G, textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

export function H2({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: "'Manrope', sans-serif",
      fontSize: "clamp(2rem, 3.5vw, 2.9rem)",
      fontWeight: 600,
      color: DARK,
      lineHeight: 1.2,
      ...style,
    }}>
      {children}
    </h2>
  );
}

export function GoldBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "0.9rem 2.2rem",
        background: hov ? "#7D2860" : G,
        color: "#fff",
        border: "none",
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "background 0.3s",
        borderRadius: RADIUS,
      }}
    >
      {children}
    </button>
  );
}

export function PageHero({ title, subtitle, img }) {
  return (
    <div style={{
      height: "52vh",
      minHeight: 380,
      position: "relative",
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
      borderRadius: RADIUS,
    }}>
      <img
        src={img}
        alt={title}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: RADIUS }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,12,8,0.65)" }} />
      <div className="page-hero-inner" style={{ position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 28, height: 1.5, background: GL }} />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", letterSpacing: "0.28em", color: GL, textTransform: "uppercase" }}>
            {subtitle}
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.1,
        }}>
          {title}
        </h1>
      </div>
    </div>
  );
}

export function CategoryBadge({ label }) {
  return (
    <div style={{ position: "absolute", top: "1rem", left: "1rem", background: G, padding: "0.28rem 0.75rem", borderRadius: RADIUS }}>
      <span style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.6rem",
        color: "#fff",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}
