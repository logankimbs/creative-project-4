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
        console.log(error);
        res.sendStatus(500);
    }
});

// read authors
app.get('/api/authors', async (req, res) => {
    try {
        let authors = await Author.find();
        res.send(authors);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// schema for blogs
const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    },
    title: String,
    content: String
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
            content: req.body.content
        });
        await blog.save();
        res.send(blog);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// read blogs
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
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));