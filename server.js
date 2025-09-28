const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

let shareState = {
  shareCount: 0,
  selectedForShare: [],
};

app.use(cors());
app.use(bodyParser.json());

// GET share data
app.get('/share-data', (req, res) => {
  res.json(shareState);
});

// POST share data
app.post('/share-data', (req, res) => {
  const { shareCount, selectedForShare } = req.body;
  if (typeof shareCount === 'number' && Array.isArray(selectedForShare)) {
    shareState = { shareCount, selectedForShare };
    return res.status(200).json({ message: 'Share data updated.' });
  }
  res.status(400).json({ message: 'Invalid share data.' });
});

// Optional: Serve masked hashes
app.get('/masked-hashes', (req, res) => {
  const maskedData = require('./public/masked_hashes.json');
  res.json(maskedData);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
