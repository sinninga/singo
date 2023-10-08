import express from 'express';
import request from 'request';
import { spotify_client_id, spotify_client_secret } from './spotifyConfig.js';

const router = express.Router(); 

var access_token = "";


var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

router.get('/test', (req, res) => {
  console.log('test route hit');
  res.send('Test route response');
});

router.get('/auth/login', (req, res) => {

  console.log('/auth/login endpoint accessed via router');


var scope = "streaming \
                user-read-email \
                user-read-private \
                user-read-playback-state \
                user-modify-playback-state"

var state = generateRandomString(16);

var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://localhost:5000/auth/callback",
    state: state
})

res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

router.get('/auth/callback', (req, res) => {

  console.log('/auth/callback endpoint accessed via app');


    var code = req.query.code;
  
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: "http://localhost:5000/auth/callback",
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        access_token = body.access_token;
        res.redirect('http://localhost:5173/')
      }
    });
  });

  router.get('/auth/token', (req, res) => {
    console.log('/auth/token endpoint accessed');

    res.json(
       {
          access_token: access_token
       })
  })

  export default router;