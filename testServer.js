const express = require('express');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());

app.post('/', fileUploadController.upload(opts));

app.listen('3507');