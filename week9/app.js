const express = require('express');
require('dotenv').config();

const { sequelize } = require('./EX1/index');
const reportsRoute = require('./routes/reportsRoute');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/reports', reportsRoute);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');
  } catch (err) {
    console.warn('Database connection status:', err.message);
  }
});

module.exports = app;
