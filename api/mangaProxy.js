export default async function handler(req, res) {
  const { url } = req.query;
  
  // Si no hay una URL proporcionada, responder con error
  if (!url) {
      return res.status(400).json({ error: 'No URL specified' });
  }

  // Asegúrate de que la URL sea válida
  try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes('mangadex.org')) {
          return res.status(400).json({ error: 'Invalid URL: Only MangaDex API is allowed' });
      }
  } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
      // Aquí puedes añadir los headers necesarios (si se requiere autenticación o token)
      const headers = {
          'User-Agent': 'MyApp/1.0 (https://your-app.com)',  // Añade tu User-Agent
          'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>',  // Si necesitas autenticación
      };

      // Realizamos la solicitud a la API de MangaDex
      const response = await fetch(url, { headers });

      // Si la respuesta es exitosa, devolver los datos
      if (response.ok) {
          const data = await response.json();
          return res.status(200).json(data);
      }

      // Si la respuesta no es exitosa, devolver un error
      return res.status(response.status).json({ error: 'Error fetching the data from MangaDex' });
  } catch (error) {
      // Manejo de errores en la solicitud
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}
