const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const app = express();
const api = require('./routes/api');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/v1', api);

if (process.env.PRODUCTION === false) {
    const buildPath = path.join(__dirname, '..', '..', 'client', 'build');
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

module.exports = app;