import { useState, useEffect } from "react";
import { G, WHITE, CREAM, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";
import { apiFetch, normalizePartner, toList } from "../api";

export default function PartnersPage() {
  const [hero, setHero]         = useState(null);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    let cancelled = false;
    apiFetch("/partners-content/current/")
      .then((d) => { if (!cancelled) setHero(d); })
      .catch(() => {});
    apiFetch("/partners/")
      .then((d) => {
        if (!cancelled) {
          const list = toList(d).sort((a, b) => (a.göstərmə_sırası ?? 0) - (b.göstərmə_sırası ?? 0)).map(normalizePartner);
          if (list.length) setPartners(list);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  return (
    <div style={{ background: WHITE }}>
      <PageHero
        title={hero?.hero_başlıq     || "Tərəfdaşlarımız"}
        subtitle={hero?.hero_alt_başlıq || "Bizim tərəfdaşlar"}
        img={hero?.örtük_şəkil_url  || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=85"}
      />

      <section style={{ padding: "6rem 4rem 8rem", background: WHITE }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Label>Tərəfdaşlarımız</Label>
            <H2>Birlikdə daha güclüyük</H2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem 3rem",
            alignItems: "center",
            justifyItems: "center",
          }}>
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                title={p.name}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", width: "100%", textDecoration: "none" }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{ maxHeight: 140, maxWidth: "100%", objectFit: "contain", filter: "grayscale(100%)", opacity: 0.6, transition: "filter 0.3s, opacity 0.3s" }}
                  onMouseEnter={(e) => { e.target.style.filter = "grayscale(0%)"; e.target.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.target.style.filter = "grayscale(100%)"; e.target.style.opacity = "0.6"; }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
