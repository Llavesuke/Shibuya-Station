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
  '/api2', // Ruta proxy para imágenes
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org',
    changeOrigin: true,
    pathRewrite: { '^/api2': '' }, // Reescribe el prefijo
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader('Referer', 'https://mangadex.org'); // Encabezado Referer válido
      proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'); // User-Agent válido
    },
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Encabezado CORS
    },
  })
);



app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
