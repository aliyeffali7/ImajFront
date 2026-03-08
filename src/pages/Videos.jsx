import { useState, useEffect } from "react";
import { G, CREAM, WHITE, DARK, MID, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";

const API = import.meta.env.VITE_API_URL || "";

const toList = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.results) return data.results;
  if (data?.data) return data.data;
  return [];
};

const getEmbedUrl = (url) => {
  if (!url) return url;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
};

const PlayIcon = () => (
  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", border: "2px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  </div>
);

export default function VideosPage() {
  const [hero, setHero]       = useState(null);
  const [videos, setVideos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [hov, setHov]         = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${API}/media-content/current/`).then((r) => r.json()).catch(() => null),
      fetch(`${API}/videos/`).then((r) => r.json()).catch(() => []),
    ]).then(([heroData, videoData]) => {
      if (!cancelled) {
        setHero(heroData);
        setVideos(
          toList(videoData).sort((a, b) => (a.göstərmə_sırası ?? 0) - (b.göstərmə_sırası ?? 0))
        );
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title={hero?.hero_başlıq || "Videolar"}
        subtitle={hero?.hero_alt_başlıq || "Media · Video"}
        img={hero?.örtük_şəkli_url || "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1400&q=85"}
      />

      <section className="r-sec r-pad" style={{ background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <Label>Video qalereya</Label>
            <H2>Videolar</H2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: MID }}>Yüklənir...</div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: MID }}>Video tapılmadı.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {videos.map((video, i) => (
                <div
                  key={video.id}
                  onClick={() => setSelected(video)}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{ cursor: "pointer", borderRadius: RADIUS, overflow: "hidden", background: DARK }}
                >
                  <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                    {video.kiçik_şəkil_url
                      ? <img src={video.kiçik_şəkil_url} alt={video.başlıq} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov === i ? "scale(1.05)" : "scale(1)", filter: "brightness(0.75)" }} />
                      : <div style={{ width: "100%", height: "100%", background: "#2a2a2a" }} />
                    }
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlayIcon />
                    </div>
                  </div>
                  <div style={{ padding: "1.2rem 1.5rem" }}>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#fff", margin: 0 }}>
                      {video.başlıq}
                    </p>
                    {video.təsvir && (
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "0.4rem", fontWeight: 300 }}>
                        {video.təsvir}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.94)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(860px, 90vw)" }}>
            <button
              onClick={() => setSelected(null)}
              style={{ position: "absolute", top: "-2.5rem", right: 0, background: "none", border: "none", color: "#fff", fontSize: "1.6rem", cursor: "pointer", lineHeight: 1 }}
            >
              ✕
            </button>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: RADIUS, overflow: "hidden" }}>
              <iframe
                src={getEmbedUrl(selected.video_url)}
                title={selected.başlıq}
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
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
