const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { pool } = require('./db');

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Маршруты
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
