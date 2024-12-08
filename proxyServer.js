const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Habilita CORS
app.use(cors());

// Configura el middleware del proxy
app.use(
  '/proxy',
  createProxyMiddleware({
    target: 'https://api.mangadex.org',
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '', // Elimina `/proxy` del path
    },
  })
);

// Inicia el servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
