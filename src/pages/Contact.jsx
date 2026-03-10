import { useState, useEffect } from "react";
import { G, CREAM, WHITE, DARK, MID, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";
import { apiFetch, normalizeSvc, normalizePkg, toList, API_URL } from "../api";

const INFO = [
  { label: "Office", value: "Izzatdin Hasanoglu 84, Narimanov, Bakı, Azərbaycan" },
  { label: "Phone",  value: "+994 12 555 0000" },
  { label: "Email",  value: "info@imajonline.az" },
  { label: "Hours",  value: "B.e – Cümə, 09:00 – 18:00 AZT · 24/7 NOC dəstək" },
];

export default function ContactPage() {
  const [form, setForm]         = useState({ name: "", email: "", phone: "", service: "", package: "", message: "" });
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [pkgLoading, setPkgLoading] = useState(false);
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState("");

  // Load services on mount
  useEffect(() => {
    apiFetch("/services/")
      .then((d) => {
        const list = toList(d).sort((a, b) => (a.sıra ?? 0) - (b.sıra ?? 0)).map(normalizeSvc);
        setServices(list);
      })
      .catch(() => {});
  }, []);

  // Load packages when service changes
  useEffect(() => {
    if (!form.service) { setPackages([]); return; }
    setPkgLoading(true);
    setForm((p) => ({ ...p, package: "" }));
    apiFetch(`/services/${form.service}/packages/`)
      .then((d) => {
        const list = toList(d).sort((a, b) => (a.sıra ?? 0) - (b.sıra ?? 0)).map(normalizePkg);
        setPackages(list);
      })
      .catch(() => setPackages([]))
      .finally(() => setPkgLoading(false));
  }, [form.service]);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Ad, e-poçt və mesaj sahələri mütləqdir.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ad:        form.name,
          epoct:     form.email,
          telefon:   form.phone,
          xidmet_id: form.service || null,
          paket:     form.package || null,
          mesaj:     form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Göndərmə zamanı xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid #ddd",
    color: DARK,
    padding: "0.75rem 0",
    width: "100%",
    outline: "none",
    fontFamily: "'Manrope', sans-serif",
    fontSize: "0.93rem",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontFamily: "'Manrope', sans-serif",
    fontSize: "0.66rem",
    letterSpacing: "0.18em",
    color: "#aaa",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="Bizimlə əlaqə"
        subtitle="Əlaqə saxlayın"
        img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85"
      />

      <section className="r-sec r-pad" style={{ background: WHITE }}>
        <div className="g-contact" style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* ── LEFT: INFO ── */}
          <div>
            <Label>Gəlin danışaq</Label>
            <H2 style={{ marginBottom: "1.6rem" }}>
              Gəlin{" "}
              <em style={{ color: G, fontWeight: 400 }}>birlikdə</em> həll tapaq
            </H2>
            <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.9, fontSize: "0.97rem", marginBottom: "3rem", fontWeight: 300 }}>
              IT xidmətlərimiz haqqında sualınız var, yaxud layihəniz üçün texniki məsləhət almaq istəyirsiniz? Komandamız 24 saat ərzində cavab verəcək.
            </p>

            {INFO.map((item) => (
              <div key={item.label} style={{ marginBottom: "2rem" }}>
                <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: G, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Manrope', sans-serif", color: MID, fontSize: "0.92rem" }}>
                  {item.value}
                </div>
              </div>
            ))}

            <div style={{ marginTop: "3rem" }}>
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"
                alt="Data Center"
                style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: RADIUS }}
              />
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="form-box" style={{ background: CREAM, borderRadius: RADIUS }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.6rem", color: DARK, marginBottom: "1rem" }}>Mesaj göndərildi!</h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", color: MID, lineHeight: 1.8 }}>
                  Bizimlə əlaqə saxladığınız üçün təşəkkür edirik. Komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.4rem", color: DARK, marginBottom: "2.5rem", fontWeight: 600 }}>
                  Bizə mesaj göndərin
                </h3>
                <div className="g-form">

                  {[
                    { id: "name",  label: "Ad və soyad",     type: "text",  placeholder: "Tam adınız" },
                    { id: "email", label: "E-poçt ünvanı",   type: "email", placeholder: "epoct@misal.az" },
                    { id: "phone", label: "Telefon nömrəsi", type: "tel",   placeholder: "+994 ..." },
                  ].map((f) => (
                    <div key={f.id}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = G)}
                        onBlur={(e) => (e.target.style.borderBottomColor = "#ddd")}
                      />
                    </div>
                  ))}

                  {/* Service dropdown */}
                  <div>
                    <label style={labelStyle}>Xidmət</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      style={inputStyle}
                    >
                      <option value="">Xidməti seçin...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Package dropdown — only when service is selected */}
                  <div>
                    <label style={labelStyle}>Paket</label>
                    <select
                      value={form.package}
                      onChange={(e) => setForm((p) => ({ ...p, package: e.target.value }))}
                      style={{ ...inputStyle, opacity: (!form.service || pkgLoading) ? 0.4 : 1 }}
                      disabled={!form.service || pkgLoading}
                    >
                      <option value="">
                        {!form.service ? "Əvvəlcə xidmət seçin..." : pkgLoading ? "Yüklənir..." : packages.length ? "Paket seçin..." : "Bu xidmət üçün paket yoxdur"}
                      </option>
                      {packages.map((pkg, i) => (
                        <option key={i} value={pkg.name}>
                          {pkg.name}{pkg.price ? ` — ${pkg.price} ${pkg.priceLabel || ""}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="span-2">
                    <label style={labelStyle}>Mesaj</label>
                    <textarea
                      rows={4}
                      placeholder="IT ehtiyaclarınız haqqında bizə məlumat verin..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => (e.target.style.borderBottomColor = G)}
                      onBlur={(e) => (e.target.style.borderBottomColor = "#ddd")}
                    />
                  </div>

                  {error && (
                    <div className="span-2" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: "#c0392b" }}>
                      {error}
                    </div>
                  )}

                  <div className="span-2">
                    <button
                      onClick={handleSubmit}
                      disabled={sending}
                      style={{ padding: "1rem 2.5rem", background: sending ? "#aaa" : G, color: "#fff", border: "none", fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", transition: "background 0.3s" }}
                      onMouseEnter={(e) => { if (!sending) e.target.style.background = "#7D2860"; }}
                      onMouseLeave={(e) => { if (!sending) e.target.style.background = G; }}
                    >
                      {sending ? "Göndərilir..." : "Mesajı göndər"}
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL INFO ── */}
      <section className="r-sec r-pad" style={{ background: CREAM }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          {[
            { title: "Yeni layihələr üçün", desc: "İnternet xidməti, hosting, şəbəkə infrastrukturu və ya kibertəhlükəsizlik ehtiyaclarınız üçün mütəxəssis komandamızla əlaqə saxlayın.", cta: "Məsləhət al" },
            { title: "Texniki dəstək", desc: "Mövcud müştərilərimiz üçün 24/7 texniki dəstək xidməti. Kritik sistemlər üçün SLA zəmanətimiz çərçivəsində operativ cavab.", cta: "Dəstək portalı" },
          ].map((card) => (
            <div key={card.title} style={{ background: WHITE, padding: "2.5rem", borderTop: `3px solid ${G}`, borderRadius: RADIUS, flex: "0 1 480px" }}>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: DARK, marginBottom: "1rem" }}>{card.title}</h3>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.87rem", color: MID, lineHeight: 1.8, marginBottom: "1.5rem", fontWeight: 300 }}>{card.desc}</p>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.78rem", color: G, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderBottom: `1px solid ${G}`, paddingBottom: "0.2rem" }}>
                {card.cta} →
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
