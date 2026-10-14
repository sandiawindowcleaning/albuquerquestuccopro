import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { TRACKING, trackingReady } from './src/config/tracking';

// Writes the analytics tags into index.html at build time from
// src/config/tracking.ts. A tag whose ID is still a PLACEHOLDER is left out,
// but the gtag() stub is always defined so app code can call it safely.
function trackingTags(): string {
  const { ga4Id, googleAdsId, metaPixelId } = TRACKING;
  const ga = trackingReady(ga4Id);
  const ads = trackingReady(googleAdsId);
  const loaderId = ga ? ga4Id : ads ? googleAdsId : null;

  const lines: string[] = [];
  lines.push(`    <!-- Google tag (gtag.js): IDs come from src/config/tracking.ts -->`);
  lines.push(`    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());${ga ? `\n      gtag('config', '${ga4Id}');` : ''}${ads ? `\n      gtag('config', '${googleAdsId}');` : ''}
    </script>`);
  // Click-to-call tracking lives here, not in the React bundle, so a tap is
  // counted even before the app has hydrated. Every tel: link on the site.
  const callLabel = TRACKING.googleAdsCallLabel;
  const adsCall = ads && trackingReady(callLabel)
    ? `gtag('event','conversion',{send_to:'${googleAdsId}/${callLabel}'});`
    : '';
  lines.push(`    <script>
      document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest && e.target.closest('a[href^="tel:"]');
        if (!a) return;
        gtag('event', 'phone_call_click', { link_location: a.getAttribute('data-call-location') || 'unknown' });${adsCall ? `\n        ${adsCall}` : ''}
        if (window.fbq) fbq('track', 'Contact');
      });
    </script>`);
  if (loaderId) {
    lines.push(`    <script async src="https://www.googletagmanager.com/gtag/js?id=${loaderId}"></script>`);
  }

  if (trackingReady(metaPixelId)) {
    // fbevents.js is fetched after the load event so it never competes with
    // the hero image for bandwidth. fbq() calls made before then are queued.
    lines.push(`    <!-- Meta Pixel -->
    <script>
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      f.addEventListener('load',function(){t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)});
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${metaPixelId}');
      fbq('track', 'PageView');
    </script>`);
  }
  return lines.join('\n');
}

function trackingPlugin(): Plugin {
  return {
    name: 'tracking-tags',
    transformIndexHtml(html) {
      return html.replace('<!--tracking-->', trackingTags());
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), trackingPlugin()],
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : { output: { manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] } } },
  },
}));
