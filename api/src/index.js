const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const buildingsPath = path.join(__dirname, '..', '..', 'all_buildings_with_ranges.json');
let buildingsCache = null;

function getBuildings() {
  if (!buildingsCache) {
    const raw = fs.readFileSync(buildingsPath, 'utf-8');
    buildingsCache = JSON.parse(raw);
  }
  return buildingsCache;
}

app.get('/buildings', (req, res) => {
  try {
    const data = getBuildings();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load buildings data' });
  }
});

function encodeLayout(layout) {
  return Buffer.from(JSON.stringify(layout)).toString('base64');
}

function decodeLayout(str) {
  const text = Buffer.from(str, 'base64').toString('utf-8');
  return JSON.parse(text);
}

app.post('/layout/encode', (req, res) => {
  const layout = req.body;
  if (!Array.isArray(layout)) {
    return res.status(400).json({ error: 'Layout must be an array' });
  }
  try {
    const encoded = encodeLayout(layout);
    res.json({ string: encoded });
  } catch (err) {
    res.status(400).json({ error: 'Failed to encode layout' });
  }
});

app.post('/layout/decode', (req, res) => {
  const { string } = req.body;
  if (typeof string !== 'string') {
    return res.status(400).json({ error: 'Missing layout string' });
  }
  try {
    const layout = decodeLayout(string);
    res.json(layout);
  } catch (err) {
    res.status(400).json({ error: 'Failed to decode layout' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
