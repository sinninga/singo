import express from 'express';
import cors from 'cors'; 
import router from './spotifyAuth.js'; 
import deeplRouter from './deeplServer.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router); 
app.use(deeplRouter); 

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});

