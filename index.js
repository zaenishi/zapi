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
    return res.status(400).send({ error: 'tetod 😹' });
  }

  const result = await loads(query.q);
  res.send(result);
});

app.get('/test', async (req, res) => {
    res.send({
        success: true,
        data: {
            active: true
        }
    });
});

app.get('/usrdb', async (req, res) => {
    const { usrq } = req.query;
    const usr = usrq ? usrq : 'unknown';

    try {
        const { respon } = await loads('@func/db.json'); 

        if (!respon) {
            return res.status(400).json({ status: 400, msg: 'tetod 😹' });
        }

        if (usr !== "unknown") {
            if (!respon.db.includes(usr)) {
                return res.json({ data: false });
            } else {
                return res.json({ data: true });
            }
        }

        return res.json(respon);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, msg: 'Terjadi kesalahan pada server' });
    }
});

    
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;