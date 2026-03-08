import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import HomePage     from "./pages/Home";
import AboutPage    from "./pages/About";
import ServicesPage from "./pages/Services";
import ProjectsPage from "./pages/Projects";
import ProjectDetailPage from "./pages/ProjectDetail";
import ContactPage  from "./pages/Contact";

export default function App() {
  const [page,      setPage]      = useState("home");
  const [projectId, setProjectId] = useState(null);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const nav = (target, id = null) => {
    setPage(target);
    if (id) setProjectId(id);
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
        ::-webkit-scrollbar-thumb { background: #B8962E; border-radius: 10px; }
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        a { text-decoration: none; }
        button { font-family: inherit; border-radius: 10px; }
        input, select, textarea { border-radius: 10px; }
        select option { background: #fff; color: #1C1C1C; }
      `}</style>

      <Navbar page={page} nav={nav} scrolled={scrolled} />

      <main>
        {page === "home"     && <HomePage     nav={nav} />}
        {page === "about"    && <AboutPage    nav={nav} />}
        {page === "services" && <ServicesPage nav={nav} />}
        {page === "projects" && <ProjectsPage nav={nav} />}
        {page === "project"  && <ProjectDetailPage projectId={projectId} nav={nav} />}
        {page === "contact"  && <ContactPage  nav={nav} />}
      </main>

      <Footer nav={nav} />
    </>
  );
}
