/// <reference types="vite/client" />

declare const __BUILD_YEAR__: number;

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}
