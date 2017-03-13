const express = require('express');
const bodyParser = require('body-parser');
const components = require('./dist/main.js');

app = express();
app.use(bodyParser.json());

app.post('/', components.controller());

app.listen('3507', () => console.log('server listening on localhost:3507'));