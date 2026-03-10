// ─── API base URL ───────────────────────────────────────────────────────────
// Set VITE_API_URL in your .env file.
// Local:      VITE_API_URL=http://localhost:8000/api
// Production: VITE_API_URL=https://api.imajonline.az/api
// ────────────────────────────────────────────────────────────────────────────
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function apiFetch(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

// ── Field normalisers (API → component) ──────────────────────────────────────

export function normalizeSvc(s) {
  return {
    id:    s.id,
    title: s.başlıq,
    short: s.qısa,
    desc:  s.təsvir,
    packages: [],
  };
}

export function normalizePkg(p) {
  return {
    name:       p.ad,
    price:      p.qiymət,
    priceLabel: p.qiymət_label,
    unit:       p.vahid,
    specs:      p.xüsusiyyət,
    badge:      p.nişan,
    highlighted: p.önə_çıxan,
    features:   p.imkanlar || [],
  };
}

export function normalizePartner(p) {
  return {
    id:   p.id,
    name: p.ad,
    logo: p.loqo_url,
    url:  p.veb_sayt || "#",
    order: p.göstərmə_sırası ?? 0,
  };
}

export const toList = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.results) return data.results;
  if (data?.data)    return data.data;
  return [];
};
