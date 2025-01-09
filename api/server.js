import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    console.log('Request received with params:', req.query);
    try {
      const response = await axios.get('https://api.mangadex.org/manga', {
        params: req.query,
      });
      console.log('Response from MangaDex:', response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error al obtener datos de MangaDex:', error.message);
      res.status(error.response?.status || 500).send('Error al obtener datos de MangaDex');
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
