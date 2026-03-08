import { useState, useEffect } from "react";
import Navbar        from "./components/Navbar";
import Footer        from "./components/Footer";
import HomePage      from "./pages/Home";
import AboutPage     from "./pages/About";
import ServicesPage  from "./pages/Services";
import ContactPage   from "./pages/Contact";
import PhotosPage    from "./pages/Photos";
import VideosPage    from "./pages/Videos";
import DocumentsPage from "./pages/Documents";

export default function App() {
  const [page,    setPage]    = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const nav = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #FAF8F5; color: #1C1C1C; font-family: 'Manrope', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FAF8F5; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #9B3574; border-radius: 10px; }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        a { text-decoration: none; }
        button { font-family: inherit; border-radius: 10px; }
        input, select, textarea { border-radius: 10px; }
        select option { background: #fff; color: #1C1C1C; }

        /* ─── RESPONSIVE ─── */
        .nav-outer { padding: 1.3rem 4rem; }
        .nav-links { display: flex; gap: 2.2rem; align-items: center; }
        .nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.4rem; }
        .nav-mobile { display: none; position: fixed; inset: 0; z-index: 190; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; background: rgba(250,248,245,0.98); backdrop-filter: blur(20px); }
        .nav-mobile.open { display: flex; }

        .r-sec    { padding: 8rem 4rem; }
        .r-sec-sm { padding: 5rem 4rem; }
        .r-sec-xs { padding: 3rem 4rem; }
        .r-pad    { padding-left: 4rem; padding-right: 4rem; }

        .g-stats        { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; text-align: center; }
        .g-quick-stats  { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; text-align: center; }
        .g-about        { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .g-mission      { display: grid; grid-template-columns: 1fr 1fr; gap: 7rem; align-items: center; }
        .g-services     { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
        .g-values       { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        .g-process      { display: grid; grid-template-columns: repeat(5,1fr); gap: 1.5rem; }
        .g-contact      { display: grid; grid-template-columns: 1fr 1.3fr; gap: 7rem; }
        .g-info         { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; }
        .g-form         { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8rem 2rem; }
        .g-footer       { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
        .g-footer-bottom{ display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; }
        .g-cta          { display: flex; justify-content: space-between; align-items: center; }
        .g-svc-header   { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }

        .tabs-wrap { display: flex; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .tabs-wrap::-webkit-scrollbar { display: none; }
        .g-pricing { display: grid; gap: 1.25rem; align-items: end; }
        .span-2 { grid-column: span 2; }

        .hero-content    { position: relative; padding: 0 4rem; max-width: 780px; }
        .page-hero-inner { padding-bottom: 4rem; padding-left: 4rem; }
        .footer-social   { display: flex; gap: 1.5rem; }
        .about-img       { position: relative; height: 520px; }
        .timeline-grid   { display: grid; grid-template-columns: 100px 1fr; }
        .form-box        { padding: 3.5rem; border-radius: 10px; }

        @media (max-width: 1024px) {
          .g-stats       { grid-template-columns: repeat(2,1fr); }
          .g-quick-stats { grid-template-columns: repeat(2,1fr); }
          .g-values      { grid-template-columns: repeat(2,1fr); }
          .g-process     { grid-template-columns: repeat(3,1fr); }
          .g-footer      { grid-template-columns: 1fr 1fr; }
          .g-services    { grid-template-columns: repeat(2,1fr); }
          .g-svc-header  { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }

        @media (max-width: 768px) {
          .nav-outer    { padding: 1rem 1.5rem; }
          .nav-links    { display: none; }
          .nav-hamburger { display: flex; align-items: center; }
          .g-pricing    { grid-template-columns: 1fr !important; }

          .r-sec    { padding: 4rem 1.5rem; }
          .r-sec-sm { padding: 3rem 1.5rem; }
          .r-sec-xs { padding: 2rem 1.5rem; }
          .r-pad    { padding-left: 1.5rem; padding-right: 1.5rem; }

          .hero-content    { padding: 0 1.5rem; }
          .page-hero-inner { padding-bottom: 2rem; padding-left: 1.5rem; }

          .g-about   { grid-template-columns: 1fr; gap: 3rem; }
          .g-mission { grid-template-columns: 1fr; gap: 3rem; }
          .g-contact { grid-template-columns: 1fr; gap: 3rem; }
          .g-info    { grid-template-columns: 1fr; }
          .g-form    { grid-template-columns: 1fr; }
          .span-2    { grid-column: span 1; }
          .g-cta     { flex-direction: column; gap: 2rem; text-align: center; }
          .g-footer  { grid-template-columns: 1fr 1fr; }
          .g-footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
          .footer-social   { justify-content: center; }
          .g-svc-header    { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .about-img { height: 320px; }
          .timeline-grid { grid-template-columns: 80px 1fr; }
          .form-box  { padding: 2rem 1.5rem; }
        }

        @media (max-width: 480px) {
          .g-stats       { grid-template-columns: 1fr 1fr; }
          .g-quick-stats { grid-template-columns: 1fr 1fr; }
          .g-services    { grid-template-columns: 1fr; }
          .g-process     { grid-template-columns: 1fr 1fr; }
          .g-values      { grid-template-columns: 1fr; }
          .g-footer      { grid-template-columns: 1fr; }
          .g-info        { grid-template-columns: 1fr; }
        }
      `}</style>

      <Navbar page={page} nav={nav} scrolled={scrolled} />

      <main>
        {page === "home"           && <HomePage      nav={nav} />}
        {page === "about"          && <AboutPage     nav={nav} />}
        {page === "services"       && <ServicesPage  nav={nav} />}
        {page === "contact"        && <ContactPage   nav={nav} />}
        {page === "media-foto"     && <PhotosPage    nav={nav} />}
        {page === "media-video"    && <VideosPage    nav={nav} />}
        {page === "media-senedler" && <DocumentsPage nav={nav} />}
      </main>

      <Footer nav={nav} />
    </>
  );
}
