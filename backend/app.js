const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', dashboardRoutes);

module.exports = app;
