import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Proxy to MangaDex API
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // Remove the /api prefix
    },
    onProxyRes: (proxyRes, req, res) => {
      // Add CORS headers for the proxy response
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
  })
);

// Proxy for MangaDex cover images
app.use(
  '/covers',
  createProxyMiddleware({
    target: 'https://uploads.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/covers': '', // Remove the /covers prefix
    },
    onProxyRes: (proxyRes, req, res) => {
      // Add CORS headers for the proxy response
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
  })
);

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
