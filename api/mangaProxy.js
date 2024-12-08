import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export default async function handler(req, res) {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejo de solicitudes OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { method, query } = req;

    if (method === 'GET' && query.imageUrl) {
      const { imageUrl } = query;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary').toString('base64');
      res.status(200).json({ image: imageBuffer });
    } else if (method === 'GET') {
      const endpoint = req.url.replace('/api/mangaProxy', '');
      const response = await axios.get(`${baseUrl}${endpoint}`, { params: query });
      res.status(200).json(response.data);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Internal server error',
    });
  }
}
