const express = require('express');
const axios = require('axios');
const app = express();
const { loads } = require('./lib/scraper.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Hello, World!' });
});

app.post('/data', (req, res) => {
    const { name } = req.body;
    res.send({ message: `Hello, ${name}` });
});

app.get('/load', async (req, res) => {
  const { query } = req;
  if (!query || !query.q) {
    return res.status(400).send({ error: 'Parameter q diperlukan, misalnya ?q=@module/file.js' });
  }

  const result = await loads(query.q);
  res.send(result);
});

// Module export for Vercel to use as a serverless function
module.exports = app;
