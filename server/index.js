import express from 'express';
import cors from 'cors'; 
import router from './spotifyAuth.js'; 

const port = 5000
const app = express();

app.use(cors());
app.use(router); 

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

