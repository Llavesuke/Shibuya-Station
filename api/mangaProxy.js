// api/mangaProxy.js

import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export default async function handler(req, res) {
  const { method } = req;

  // Si la solicitud es para obtener mangas
  if (method === 'GET' && !req.query.tags) {
    try {
      const response = await axios.get(`${baseUrl}/manga`, { params: req.query });
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching mangas:', error);
      res.status(500).json({ error: 'Error fetching mangas' });
    }
  }

  // Si la solicitud es para obtener tags
  else if (method === 'GET' && req.query.tags) {
    try {
      const response = await axios.get(`${baseUrl}/manga/tag`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      res.status(500).json({ error: 'Error fetching tags' });
    }
  }
}
