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


app.use(
  '/api2',
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org', // Redirige al dominio de imágenes de MangaDex
    changeOrigin: true, // Cambia el origen para que coincida con el destino
    secure: true, // Asegúrate de que el proxy utiliza HTTPS
    pathRewrite: {
      '^/api2': '', // Elimina el prefijo /api2 para que las rutas sean correctas
    },
    headers: {
      Referer: 'https://mangadex.org', // Incluye un Referer válido
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', // Simula un navegador moderno
    },
    logLevel: 'debug', // Activa los logs detallados para depuración
  })
);



app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
