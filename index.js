const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const { loads } = require('./lib/scraper.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/load', async (req, res) => {
  const { query } = req;
  if (!query || !query.q) {
    return res.status(400).send({ error: 'Parameter q diperlukan, misalnya ?q=@module/file.js' });
  }

  const result = await loads(query.q);
  res.send(result);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;