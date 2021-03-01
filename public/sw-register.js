import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');
    wb.register();
} 