const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemonRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api', pokemonRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// centralized error handling — must be after routes
app.use(errorHandler);

module.exports = app;
