import axios from 'axios';

export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'No path specified' });
  }

  try {
    const response = await axios.get(`https://api.mangadex.org/${path}`, {
      params: req.query,
      headers: {
        'User-Agent': 'MyApp/1.0 (https://your-app.com)',
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error fetching data from MangaDex:', error);
    res.status(500).json({ error: 'Error fetching data from MangaDex' });
  }
}