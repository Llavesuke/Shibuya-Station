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
  '/image',
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/image': '', // Reescribe el prefijo /covers
    },
    onProxyRes: (proxyRes, req, res) => {
      // Aseguramos que los encabezados CORS se envíen correctamente
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    },
    onProxyReq: (proxyReq, req, res) => {
      // Enviar encabezado para solicitudes preflight (OPTIONS)
      if (req.method === 'OPTIONS') {
        proxyReq.method = 'GET'; // Cambiar método de OPTIONS a GET
      }
    },
  })
);


app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
