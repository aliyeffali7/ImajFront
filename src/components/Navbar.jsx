import { G, DARK, RADIUS } from "../theme";

const NAV_LINKS = [
  { label: "Ana səhifə", key: "home" },
  { label: "Haqqımızda", key: "about" },
  { label: "Xidmətlər",  key: "services" },
  { label: "Layihələr",  key: "projects" },
  { label: "Əlaqə",      key: "contact" },
];

export default function Navbar({ page, nav, scrolled }) {
  const transparent = page === "home" && !scrolled;

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 200,
      padding: "1.3rem 4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: transparent ? "transparent" : "rgba(250,248,245,0.97)",
      borderBottom: transparent ? "none" : "1px solid rgba(155,53,116,0.2)",
      backdropFilter: transparent ? "none" : "blur(14px)",
      transition: "all 0.4s ease",
      fontFamily: "'Manrope', sans-serif",
    }}>
      {/* Logo */}
      <button
        onClick={() => nav("home")}
        style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer" }}
      >
        <img
          src="/image 3.svg"
          alt="ImajOnline loqosu"
          style={{ height: 32, width: "auto", display: "block" }}
        />

        {/* Ali petuxdu */}
        
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: transparent ? "#fff" : DARK,
          letterSpacing: "0.05em",
          transition: "color 0.4s",
        }}>
        
        </span>
      </button>

      {/* Links */}
      <div style={{ display: "flex", gap: "2.2rem", alignItems: "center" }}>
        {NAV_LINKS.map((l) => (
          <button
            key={l.key}
            onClick={() => nav(l.key)}
            style={{
              background: "none",
              border: "none",
              borderBottom: page === l.key ? `1.5px solid ${G}` : "1.5px solid transparent",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: page === l.key ? G : (transparent ? "rgba(255,255,255,0.85)" : "#666"),
              fontWeight: page === l.key ? 600 : 400,
              padding: "0.25rem 0",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = G)}
            onMouseLeave={(e) => (e.target.style.color = page === l.key ? G : (transparent ? "rgba(255,255,255,0.85)" : "#666"))}
          >
            {l.label}
          </button>
        ))}

        <button
          onClick={() => nav("contact")}
          style={{
            padding: "0.6rem 1.5rem",
            background: G,
            color: "#fff",
            border: "none",
            borderRadius: RADIUS,
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#7D2860")}
          onMouseLeave={(e) => (e.target.style.background = G)}
        >
          Əlaqə saxla
        </button>
      </div>
    </nav>
  );
}
