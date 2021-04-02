const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Scheme for tags
const tagSchema = new mongoose.Schema({
    item: String,
    color: String
});

// Model for tags
const Tag = mongoose.model('Tag', tagSchema);

// Create a tag
app.post('/api/tags', async (req, res) => {
    const tag = new Tag({
        item: req.body.item,
        color: req.body.color
    });
    try {
        await tag.save();
        res.send(tag);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));