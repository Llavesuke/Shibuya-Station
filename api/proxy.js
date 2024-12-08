import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: 'https://api.mangadex.org', 
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', 
  },
});

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    proxy(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
