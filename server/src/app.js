// app.js - express app
const express = require('express');
const cors = require('cors');
const bugsRouter = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugsRouter);

app.use(errorHandler);

module.exports = app;
