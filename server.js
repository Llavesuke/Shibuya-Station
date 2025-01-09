import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
}));

const PORT = 5000;

app.get('/manga', async (req, res) => {
  console.log('Request received with params:', req.query);
  try {
    const response = await axios.get('https://api.mangadex.org/manga', {
      params: req.query,
    });
    console.log('Response from MangaDex:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener datos de MangaDex:', error.message);
    res.status(error.response?.status || 500).send('Error al obtener datos de MangaDex');
  }
});


app.listen(PORT, () => {
  console.log(`Proxy corriendo en http://localhost:${PORT}`);
});
