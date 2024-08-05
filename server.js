const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/query', (req, res) => {
  const workbook = xlsx.readFile('data.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  // Example query: filter data based on a query parameter
  const query = req.query.q;
  const result = data.filter(row => row.Name.includes(query));

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});