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
  '/api2',
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/api2': '', // Reescribe el prefijo /covers
    },
  })
);


app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
