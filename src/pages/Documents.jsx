import { useState, useEffect } from "react";
import { G, GL, CREAM, WHITE, DARK, MID, LIGHT, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";

const API = import.meta.env.VITE_API_URL || "";

const toList = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.results) return data.results;
  if (data?.data) return data.data;
  return [];
};

const FileIcon = ({ type }) => {
  const color = type?.toUpperCase() === "PDF" ? "#e74c3c" : type?.toUpperCase() === "DOC" || type?.toUpperCase() === "DOCX" ? "#2980b9" : "#7f8c8d";
  return (
    <div style={{ width: 44, height: 44, borderRadius: 8, background: color + "20", border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    </div>
  );
};

export default function DocumentsPage() {
  const [hero, setHero]           = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [hov, setHov]             = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${API}/media-content/current/`).then((r) => r.json()).catch(() => null),
      fetch(`${API}/documents/`).then((r) => r.json()).catch(() => []),
    ]).then(([heroData, docData]) => {
      if (!cancelled) {
        setHero(heroData);
        setDocuments(
          toList(docData).sort((a, b) => (a.göstərmə_sırası ?? 0) - (b.göstərmə_sırası ?? 0))
        );
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title={hero?.hero_başlıq || "Sənədlər"}
        subtitle={hero?.hero_alt_başlıq || "Media · Sənədlər"}
        img={hero?.örtük_şəkli_url || "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1400&q=85"}
      />

      <section className="r-sec r-pad" style={{ background: WHITE }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <Label>Yüklənə bilən fayllar</Label>
            <H2>Sənədlər</H2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: MID }}>Yüklənir...</div>
          ) : documents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem", fontFamily: "'Manrope', sans-serif", color: MID }}>Sənəd tapılmadı.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {documents.map((doc, i) => (
                <div
                  key={doc.id}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem 2rem", background: hov === i ? CREAM : WHITE, border: `1px solid ${hov === i ? G + "40" : "rgba(0,0,0,0.07)"}`, borderRadius: RADIUS, transition: "all 0.3s" }}
                >
                  <FileIcon type={doc.fayl_tipi} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1rem", fontWeight: 600, color: DARK, marginBottom: "0.25rem" }}>
                      {doc.başlıq}
                    </div>
                    {doc.təsvir && (
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: LIGHT, fontWeight: 300 }}>
                        {doc.təsvir}
                      </div>
                    )}
                  </div>

                  {doc.fayl_tipi && (
                    <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", color: G, background: G + "18", padding: "0.3rem 0.75rem", borderRadius: RADIUS, textTransform: "uppercase", flexShrink: 0 }}>
                      {doc.fayl_tipi}
                    </span>
                  )}

                  <a
                    href={doc.fayl_url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1.4rem", background: G, color: "#fff", borderRadius: RADIUS, fontFamily: "'Manrope', sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", flexShrink: 0, transition: "background 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#7D2860")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = G)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Yüklə
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
