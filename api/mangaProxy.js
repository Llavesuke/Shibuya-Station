// api/mangaProxy.js
import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export default async function handler(req, res) {
  const { method, query } = req;

  // Si la solicitud es para obtener mangas
  if (method === 'GET' && !query.imageUrl) {
    try {
      const response = await axios.get(`${baseUrl}/manga`, { params: query });
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching mangas:', error);
      res.status(500).json({ error: 'Error fetching mangas' });
    }
  }

  // Si la solicitud es para obtener imágenes
  else if (method === 'GET' && query.imageUrl) {
    try {
      const { imageUrl } = query;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary').toString('base64');
      res.status(200).json({ image: imageBuffer });
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Error fetching image' });
    }
  }
}
