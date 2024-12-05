import axios from 'axios';

const getAccessToken = async (authorizationCode) => {
  const clientId = '22887';  // Tu Client ID
  const clientSecret = 'J7ZDgJxCvO961eNBmhM3jNG9OZIiUjLa19JXEZiq';  // Tu Client Secret
  const redirectUri = 'http://localhost:5173/library';  // El redirect URI que usaste

  try {
    const response = await axios.post('https://anilist.co/api/v2/oauth/token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,  // El código de autorización que recibiste
      redirect_uri: redirectUri,  // El mismo URI que usaste en la solicitud inicial
      grant_type: 'authorization_code',  // El tipo de grant
    });

    // Aquí obtenemos el Access Token y Refresh Token
    const { access_token, refresh_token } = response.data;
    console.log('Access Token:', access_token);  // El Access Token
    console.log('Refresh Token:', refresh_token);  // El Refresh Token (para renovar el token cuando caduque)
    return access_token;
  } catch (error) {
    console.error('Error obteniendo el Access Token:', error);
    return null;
  }
};

// Llama a esta función pasando el código de autorización que has recibido
const authorizationCode = 'def5020003de3298fca6b5dfa07afb3c9fd62d12e7ace87e5455cf817df4f3ad92400cf48b635e88aa6ef3e022a5611f93729e05b09a8ab27eddb3d99b4a6f670a9b044ae3ed0ba26fc25708f868b8766ab797256d868c1dda38fcd717444a1b2586e125fbc11e915c69dffb2f9bd2b8dcd013a27df7d9cb0960aeadc6efb6c58b40bf678820c891d90bd0d85a99adfd8c21fafce1ed4db194ccc384a5ec9bd3e43efbe11d5bee0203f7828d9d7919afb092acfb9744fae385f577e90e4334bea19660cddc373987f5b01ed21f436df6a9a1e3423ff945602a2970a5d354c7b4c3ad7c08c9539319d5422f1a65531d42054726d0ee8ce4146edfe0171b53f450bc6fef5efd933022e0516ac9eca9271c5de2ef431a5151495233020b8fd419d81cb4ca0de9bfb115e643c040af6c3d8cf1b6216941bdda76df813b0c3e0e8a6f0eb125ce349f67804473825c6a44d45a5b15d6d758ae5411c5ed44c43fbdb2cb0ea919c10f13ee58';

getAccessToken(authorizationCode);
