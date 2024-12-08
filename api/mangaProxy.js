import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    try {
      const response = await axios.get(`${baseUrl}${req.url.replace('/api/mangaProxy', '')}`, {
        params: query,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error in proxy handler:', error.message);
      res.status(error.response?.status || 500).json({
        error: error.message || 'Error fetching data',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
