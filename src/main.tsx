import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages arrive fully prerendered (scripts/prerender.mjs), so React
// HYDRATES that markup: it attaches to the existing DOM instead of replacing
// it, and the hero/LCP paints from plain HTML before any JS runs. This works
// because every route is imported statically (see src/routes.tsx).
// `npm run dev` serves an empty shell, so it falls back to a normal render.
// (In production this bundle is loaded after the page's load event; see
// scripts/prerender.mjs.)
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
