import { G, GL, DARK } from "../theme";

export default function Footer({ nav }) {
  const cols = [
    {
      heading: "Şirkət",
      links: [["Ana səhifə", "home"], ["Haqqımızda", "about"], ["Xidmətlər", "services"], ["Layihələr", "projects"]],
    },
    {
      heading: "Xidmətlər",
      links: [["İnternet xidmətləri", "services"], ["Hosting & Bulud", "services"], ["Şəbəkə infrastrukturu", "services"], ["Kibertəhlükəsizlik", "services"]],
    },
    {
      heading: "Əlaqə",
      links: [["Bakı, Azərbaycan", "#"], ["info@imajonline.az", "#"], ["+994 12 555 0000", "#"], ["Dəstək portalı", "contact"]],
    },
  ];

  return (
    <footer style={{ background: DARK, padding: "4rem", fontFamily: "'Manrope', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
              <img
                src="/image 3.svg"
                alt="ImajOnline loqosu"
                style={{ height: 30, width: "auto", display: "block" }}
              />
            </div>
            <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.8, maxWidth: 280, fontWeight: 300 }}>
              2009-cu ildən bəri internet, hosting, şəbəkə infrastrukturu və kibertəhlükəsizlik xidmətləri göstərən Azərbaycanın aparıcı IT şirkəti ImajOnline.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <div style={{ color: G, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.2rem", fontWeight: 600 }}>
                {col.heading}
              </div>
              {col.links.map(([label, key]) => (
                <button
                  key={label}
                  onClick={() => nav(key)}
                  style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "#666", fontSize: "0.85rem", lineHeight: 2, textAlign: "left", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.color = GL)}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem" }}>
          <div style={{ color: "#444", fontSize: "0.75rem" }}>
            © 2025 ImajOnline IT Services. Bütün hüquqlar qorunur.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Instagram", "LinkedIn", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                style={{ color: "#444", fontSize: "0.75rem", transition: "color 0.3s", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = G)}
                onMouseLeave={(e) => (e.target.style.color = "#444")}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
