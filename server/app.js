const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('409_USW_Campus');
});

app.listen(PORT, () => {
  console.log(`Server Start PORT : ${PORT}`);
});
