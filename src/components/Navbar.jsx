import { useState } from "react";
import { G, DARK, RADIUS } from "../theme";

const MEDIA_ITEMS = [
  { label: "Şəkillər", key: "media-foto" },
  { label: "Videolar",  key: "media-video" },
  { label: "Sənədlər", key: "media-senedler" },
];


const NAV_LINKS = [
  { label: "Ana səhifə", key: "home" },
  { label: "Haqqımızda", key: "about" },
  { label: "Xidmətlər",  key: "services" },
  { label: "Media",      key: "media" },
  { label: "Tərəfdaşlar", key: "partners" },
  { label: "Əlaqə",      key: "contact" },
];

export default function Navbar({ page, nav }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);

  const isMediaPage = page?.startsWith("media");

  const handleNav = (key) => {
    if (key === "media") return;
    nav(key);
    setMediaOpen(false);
    setMobileOpen(false);
  };

  const handleMobileNav = (key) => {
    nav(key);
    setMobileOpen(false);
    setMobileMediaOpen(false);
  };

  return (
    <>
      <nav className="nav-outer" style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        borderBottom: "1px solid rgba(155,53,116,0.2)",
        fontFamily: "'Manrope', sans-serif",
      }}>
        {/* Logo */}
        <button
          onClick={() => { nav("home"); setMobileOpen(false); }}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/image 3.svg" alt="ImajOnline loqosu" style={{ height: 52, width: "auto", display: "block" }} />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: DARK, letterSpacing: "0.05em" }} />
        </button>

        {/* Desktop Links */}
        <div className="nav-links">
          {NAV_LINKS.map((l) => {
            const isActive = l.key === "media" ? isMediaPage : page === l.key;
            if (l.key === "media") {
              return (
                <div
                  key="media"
                  style={{ position: "relative" }}
                  onMouseEnter={() => setMediaOpen(true)}
                  onMouseLeave={() => setMediaOpen(false)}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      borderBottom: isActive ? `1.5px solid ${G}` : "1.5px solid transparent",
                      cursor: "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: isActive ? G : "#111",
                      fontWeight: isActive ? 600 : 400,
                      padding: "0.25rem 0",
                      transition: "color 0.3s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = DARK)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? G : "#111")}
                  >
                    Media
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{ opacity: 0.7 }}>
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </button>

                  <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "rgba(250,248,245,0.98)",
                      border: "1px solid rgba(155,53,116,0.15)",
                      borderRadius: RADIUS,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                      padding: "0.5rem 0",
                      minWidth: 150,
                      backdropFilter: "blur(14px)",
                      opacity: mediaOpen ? 1 : 0,
                      visibility: mediaOpen ? "visible" : "hidden",
                      pointerEvents: mediaOpen ? "auto" : "none",
                      transition: "opacity 0.15s, visibility 0.15s",
                    }}>
                      {MEDIA_ITEMS.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleNav(item.key)}
                          style={{
                            display: "block",
                            width: "100%",
                            background: page === item.key ? G + "12" : "none",
                            border: "none",
                            padding: "0.7rem 1.4rem",
                            textAlign: "left",
                            cursor: "pointer",
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "0.8rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: page === item.key ? G : "#555",
                            fontWeight: page === item.key ? 600 : 400,
                            transition: "color 0.2s, background 0.2s",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = G; e.currentTarget.style.background = G + "12"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = page === item.key ? G : "#555"; e.currentTarget.style.background = page === item.key ? G + "12" : "none"; }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                </div>
              );
            }

            return (
              <button
                key={l.key}
                onClick={() => nav(l.key)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? `1.5px solid ${G}` : "1.5px solid transparent",
                  cursor: "pointer",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? G : "#111",
                  fontWeight: isActive ? 600 : 400,
                  padding: "0.25rem 0",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = G)}
                onMouseLeave={(e) => (e.target.style.color = isActive ? G : "#111")}
              >
                {l.label}
              </button>
            );
          })}

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

        {/* Hamburger Button (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menyu"
          style={{ color: DARK }}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          style={{ position: "absolute", top: "1.2rem", right: "1.5rem", background: "none", border: "none", cursor: "pointer", color: DARK }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {NAV_LINKS.map((l) => {
          const isActive = l.key === "media" ? isMediaPage : page === l.key;
          if (l.key === "media") {
            return (
              <div key="media" style={{ textAlign: "center" }}>
                <button
                  onClick={() => setMobileMediaOpen((o) => !o)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Manrope', sans-serif", fontSize: "1.1rem",
                    fontWeight: isActive ? 700 : 500, color: isActive ? G : DARK,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                >
                  Media
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor" style={{ opacity: 0.7, transform: mobileMediaOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
                {mobileMediaOpen && (
                  <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {MEDIA_ITEMS.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleMobileNav(item.key)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem",
                          color: page === item.key ? G : "#666",
                          fontWeight: page === item.key ? 600 : 400,
                          textTransform: "uppercase", letterSpacing: "0.08em",
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <button
              key={l.key}
              onClick={() => handleMobileNav(l.key)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Manrope', sans-serif", fontSize: "1.1rem",
                fontWeight: isActive ? 700 : 500, color: isActive ? G : DARK,
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}
            >
              {l.label}
            </button>
          );
        })}

        <button
          onClick={() => handleMobileNav("contact")}
          style={{
            marginTop: "0.5rem",
            padding: "0.9rem 2.5rem",
            background: G, color: "#fff",
            border: "none", borderRadius: RADIUS,
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.85rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Əlaqə saxla
        </button>
      </div>
    </>
  );
}
