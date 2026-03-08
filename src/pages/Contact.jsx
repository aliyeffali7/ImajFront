import { useState } from "react";
import { G, CREAM, WHITE, DARK, MID, RADIUS } from "../theme";
import { Label, H2, PageHero } from "../components/Shared";
import { SERVICES_DATA } from "../data";

const INFO = [
  { label: "Office", value: "Izzatdin Hasanoglu 84, Narimanov, Bakı, Azərbaycan" },
  { label: "Phone",  value: "+994 12 555 0000" },
  { label: "Email",  value: "info@restyle.az" },
  { label: "Hours",  value: "B.e – Cümə, 09:00 – 18:00 AZT · 24/7 NOC dəstək" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

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

  return (
    <div style={{ background: CREAM }}>
      <PageHero
        title="Bizimlə əlaqə"
        subtitle="Əlaqə saxlayın"
        img="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85"
      />

      <section style={{ padding: "7rem 4rem", background: WHITE }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "7rem" }}>

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
                <div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: G, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "'Manrope', sans-serif", color: MID, fontSize: "0.92rem" }}>
                    {item.value}
                  </div>
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
          <div style={{ background: CREAM, padding: "3.5rem", borderRadius: RADIUS }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem 2rem" }}>

                    {[
                    { id: "name",  label: "Ad və soyad",        type: "text",  placeholder: "Tam adınız",       span: 1 },
                    { id: "email", label: "E-poçt ünvanı",      type: "email", placeholder: "epoct@misal.az",   span: 1 },
                    { id: "phone", label: "Telefon nömrəsi",    type: "tel",   placeholder: "+994 ...",         span: 1 },
                  ].map((f) => (
                    <div key={f.id} style={{ gridColumn: `span ${f.span}` }}>
                      <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.66rem", letterSpacing: "0.18em", color: "#aaa", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>
                        {f.label}
                      </label>
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

                  <div>
                    <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.66rem", letterSpacing: "0.18em", color: "#aaa", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Xidmət</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      style={{ ...inputStyle }}
                    >
                      <option value="" disabled>Xidməti seçin...</option>
                      {SERVICES_DATA.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.66rem", letterSpacing: "0.18em", color: "#aaa", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Büdcə aralığı</label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                      style={{ ...inputStyle }}
                    >
                      <option value="" disabled>Aralığı seçin...</option>
                      {["1,000 $-dan az", "1,000 – 5,000 $", "5,000 – 20,000 $", "20,000 – 100,000 $", "100,000 $ və daha çox"].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.66rem", letterSpacing: "0.18em", color: "#aaa", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Mesaj</label>
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

                  <div style={{ gridColumn: "span 2" }}>
                    <button
                      onClick={() => setSent(true)}
                      style={{ padding: "1rem 2.5rem", background: G, color: "#fff", border: "none", fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                      onMouseEnter={(e) => (e.target.style.background = "#7D2860")}
                      onMouseLeave={(e) => (e.target.style.background = G)}
                    >
                      Mesajı göndər
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL INFO ── */}
      <section style={{ background: CREAM, padding: "6rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {[
            { title: "Yeni layihələr üçün", desc: "İnternet xidməti, hosting, şəbəkə infrastrukturu və ya kibertəhlükəsizlik ehtiyaclarınız üçün mütəxəssis komandamızla əlaqə saxlayın.", cta: "Məsləhət al" },
            { title: "Karyera üçün", desc: "Komandamıza qoşulmaq üçün istedadlı şəbəkə mühəndisləri, sistem administratorları və kibertəhlükəsizlik mütəxəssislərini axtarırıq.", cta: "Vakansiyalara bax" },
            { title: "Texniki dəstək", desc: "Mövcud müştərilərimiz üçün 24/7 texniki dəstək xidməti. Kritik sistemlər üçün SLA zəmanətimiz çərçivəsində operativ cavab.", cta: "Dəstək portalı" },
          ].map((card) => (
            <div key={card.title} style={{ background: WHITE, padding: "2.5rem", borderTop: `3px solid ${G}`, borderRadius: RADIUS }}>
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
