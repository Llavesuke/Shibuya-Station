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
    onProxyRes: (proxyRes) => {
      // Asegurarse de que el proxy permita CORS
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Permitir solicitudes de cualquier origen
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'; // Métodos permitidos
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'; // Encabezados permitidos
    },
  })
);


app.use(
  '/api2',
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org',
    changeOrigin: true, 
    secure: true,
    pathRewrite: {
      '^/api2': '', 
    },
    headers: {
      Referer: 'https://mangadex.org',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Simula un navegador moderno
    },
    logLevel: 'debug', 
  })
);



app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
