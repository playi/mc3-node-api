const express = require('express');
const bodyParser = require('body-parser');
const components = require('./dist/main.js');
const config = require('./testConfig');

app = express();
app.use(bodyParser.json());

app.post('/subscribe', components.controller.subscribe(config.MAILCHIMP_API_KEY));

app.listen('3507', () => console.log('server listening on localhost:3507'));