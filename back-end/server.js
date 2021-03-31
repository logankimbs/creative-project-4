const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/cp4', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const cp4Schema = new mongoose.Schema({
    name: String
});

const Cp4 = mongoose.model('Cp4', cp4Schema);

app.listen(3000, () => console.log('Server listening on port 3000!'));