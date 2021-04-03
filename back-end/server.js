const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

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

// Schema for blog post
const blogPostSchema = new mongoose.Schema({
    author: String,
    title: String,
    tag: String,
    path: String,
    content: String
});

// Model for blog post
const BlogPost = new mongoose.model('BlogPost', blogPostSchema);

// Upload photo
const upload = multer({
    dest: '../front-end/public/images',
    limits: {
        fileSize: 10000000
    }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Create blog post
app.post('/api/blogPosts', async (req, res) => {
    const blogPost = new BlogPost({
        author: req.body.author,
        title: req.body.title,
        tag: req.body.tag,
        path: req.body.path,
        content: req.body.content
    });
    try {
        await blogPost.save();
        res.send(blogPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));