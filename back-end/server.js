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

// create scheme for author
const authorSchema = new mongoose.Schema({
    name: String
});
  
// create model for author
const Author = mongoose.model('Author', authorSchema);

// create author
app.post('/api/authors', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        await author.save();
        res.send(author);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

// read authors
app.get('/api/authors', async (req, res) => {
    try {
        let authors = await Author.find();
        res.send(authors);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

// Configure multer so it will upload to '../front-end/public/images'
const upload = multer({
    dest: '/var/www/cp4.logankimball.com/images/',
    limits: {
      fileSize: 10000000
    }
  });

app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// schema for blogs
const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    },
    title: String,
    tag: String,
    path: String,
    content: String,
    timeStamp: String
});

// create model for blog
const Blog = mongoose.model('Blog', blogSchema);

// create blog
app.post('/api/authors/:authorID/blogs', async (req, res) => {
    try {
        let author = await Author.findOne({_id: req.params.authorID});
        if (!author) {
            res.send(404);
            return;
        }
        let blog = new Blog({
            author: author,
            title: req.body.title,
            tag: req.body.tag,
            path: req.body.path,
            content: req.body.content,
            timeStamp: req.body.timeStamp
        });
        await blog.save();
        res.send(blog);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

// read blogs by author
app.get('/api/authors/:authorID/blogs', async (req, res) => {
    try {
        let author = await Author.findOne({_id: req.params.authorID});
        if (!author) {
            res.send(404);
            return;
        }
        let blogs = await Blog.find({author:author}).populate('author');
        res.send(blogs);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

// edit blog
app.put('/api/authors/:authorID/blogs/:blogID', async (req, res) => {
    try {
        let blog = await Blog.findOne({_id:req.params.blogID, author: req.params.authorID});
        if (!blog) {
            res.send(404);
            return;
        }
        blog.title = req.body.title;
        blog.tag = req.body.tag;
        blog.content = req.body.content;
        blog.save();
        res.send(blog);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

// delete blog
app.delete('/api/authors/:authorID/blogs/:blogID', async (req, res) => {
    try {
        let blog = await Blog.findOne({_id:req.params.blogID, author: req.params.authorID});
        if (!blog) {
            res.send(404);
            return;
        }
        await blog.delete();
        res.sendStatus(200);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

app.listen(4000, () => console.log('Server listening on port 4000!'));