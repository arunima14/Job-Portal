import express from 'express'
import axios from 'axios'


const app = express();
const port = 3001; // Set your desired port

// Enable CORS for your server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Adjust this to your needs
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Proxy the request to the target URL
app.get('/api/jobs.json', (req, res) => {
  const url = 'https://findwork.dev/api/jobs.json';
  
  axios.get(url)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});