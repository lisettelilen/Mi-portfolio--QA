const axios = require('axios');
const querystring = require('querystring');

module.exports = async (req, res) => {
  const code = req.query.code || null;
  const redirect_uri = process.env.REDIRECT_URI;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
      querystring.stringify({
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      }), {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    const access_token = response.data.access_token;
    res.redirect('/?access_token=' + access_token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener token');
  }
};
