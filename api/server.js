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
      '^/covers': '', // Reescribe el prefijo /covers
    },
    onProxyRes: (proxyRes) => {
      // Agregar los encabezados CORS para permitir el acceso desde el frontend
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    },
    // Manejo de las solicitudes OPTIONS (para CORS preflight)
    onProxyReqWs: (proxyReq, req, socket, head) => {
      if (req.method === 'OPTIONS') {
        proxyReq.method = 'GET'; // Cambiar método a GET para la solicitud preflight
      }
    }
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
