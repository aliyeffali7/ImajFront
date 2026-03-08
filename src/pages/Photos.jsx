import { useState, useEffect } from "react";
import { G, GL, CREAM, WHITE, DARK, MID, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";

const API = import.meta.env.VITE_API_URL || "";

const toList = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.results) return data.results;
  if (data?.data) return data.data;
  return [];
};

const PlaceholderIcon = () => (
  <div style={{ width: "100%", height: "100%", background: "#e8e4de", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  </div>
);

export default function PhotosPage() {
  const [hero, setHero]       = useState(null);
  const [photos, setPhotos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [hov, setHov]         = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${API}/media-content/current/`).then((r) => r.json()).catch(() => null),
      fetch(`${API}/photos/`).then((r) => r.json()).catch(() => []),
    ]).then(([heroData, photoData]) => {
      if (!cancelled) {
        setHero(heroData);
        setPhotos(
          toList(photoData).sort((a, b) => (a.göstərmə_sırası ?? 0) - (b.göstərmə_sırası ?? 0))
        );
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title={hero?.hero_başlıq || "Şəkillər"}
        subtitle={hero?.hero_alt_başlıq || "Media · Qalereya"}
        img={hero?.örtük_şəkli_url || "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1400&q=85"}
      />

      <section className="r-sec r-pad" style={{ background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <Label>Qalereya</Label>
            <H2>Şəkillər</H2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: MID }}>Yüklənir...</div>
          ) : photos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: MID }}>Şəkil tapılmadı.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => setSelected(photo)}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{ position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: RADIUS, height: 250 }}
                >
                  {photo.şəkil_url
                    ? <img src={photo.şəkil_url} alt={photo.alt_mətn || photo.başlıq} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov === i ? "scale(1.05)" : "scale(1)" }} />
                    : <PlaceholderIcon />
                  }
                  <div style={{ position: "absolute", inset: 0, background: "rgba(15,10,5,0.65)", opacity: hov === i ? 1 : 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
                    {photo.təsvir && (
                      <span style={{ background: G, color: "#fff", padding: "0.3rem 0.9rem", borderRadius: RADIUS, fontSize: "0.65rem", fontFamily: "'Manrope', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                        {photo.təsvir}
                      </span>
                    )}
                    <span style={{ fontFamily: "'Manrope', sans-serif", color: "#fff", fontSize: "0.95rem", fontWeight: 600, textAlign: "center" }}>
                      {photo.başlıq}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw" }}>
            <button
              onClick={() => setSelected(null)}
              style={{ position: "absolute", top: "-2.5rem", right: 0, background: "none", border: "none", color: "#fff", fontSize: "1.6rem", cursor: "pointer", lineHeight: 1 }}
            >
              ✕
            </button>
            {selected.şəkil_url
              ? <img src={selected.şəkil_url} alt={selected.başlıq} style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", borderRadius: RADIUS, display: "block" }} />
              : <PlaceholderIcon />
            }
            {selected.başlıq && (
              <p style={{ fontFamily: "'Manrope', sans-serif", color: "rgba(255,255,255,0.85)", textAlign: "center", marginTop: "1rem", fontSize: "0.95rem" }}>
                {selected.başlıq}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
