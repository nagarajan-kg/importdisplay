const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend running');
});

module.exports = app;
