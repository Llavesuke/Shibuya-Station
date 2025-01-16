import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 5000;

app.use(cors());

// Proxy para la API principal de MangaDex
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Reescribe el prefijo /api
    },
  })
);

// Proxy para las portadas de MangaDex
app.use(
  '/covers',
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/covers': '',
    },
    onProxyRes: (proxyRes) => {
      // Set additional headers to handle CORS for images
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      proxyRes.headers['cross-origin-embedder-policy'] = 'unsafe-none';
      proxyRes.headers['cross-origin-opener-policy'] = 'same-origin-allow-popups';
    }
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
