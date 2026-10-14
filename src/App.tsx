import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileCallBar } from './components/MobileCallBar';
import { CtaBand } from './components/CtaBand';
import { PageContext } from './components/PageContext';
import { NOT_FOUND, PAGES, type PageDef } from './routes';
import { applyHead } from './lib/head';
import { trackPageView } from './lib/analytics';

// Path the <head> currently describes. Module-level so it survives remounts.
let headPath: string | null = null;

function PageShell({ def }: { def: PageDef }) {
  const { pathname } = useLocation();

  // Keep <head> in sync with the route. On client-side navigation (not the
  // first load, which the index.html Pixel snippet already counted), also
  // scroll to top and log a Pixel PageView.
  useEffect(() => {
    applyHead(def);
    if (headPath !== null && headPath !== pathname) {
      window.scrollTo(0, 0);
      trackPageView();
    }
    headPath = pathname;
  }, [pathname, def]);

  return (
    <PageContext.Provider value={{ path: def.path, crumbs: def.crumbs }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-card">
        Skip to content
      </a>
      <Header />
      <main id="main">{def.element}</main>
      {!def.hideCtaBand && <CtaBand />}
      <Footer />
      <MobileCallBar />
    </PageContext.Provider>
  );
}

export function App() {
  return (
    <div className="pb-14 md:pb-0">
      <Routes>
        {PAGES.map((p) => (
          <Route key={p.path} path={p.path} element={<PageShell def={p} />} />
        ))}
        <Route path="*" element={<PageShell def={NOT_FOUND} />} />
      </Routes>
    </div>
  );
}
