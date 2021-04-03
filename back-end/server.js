const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

// app uses express
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

// schema for author
const authorSchema = mongoose.Schema({
    name: String
});

// model for author
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

// schema for blog post
const blogPostSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    },
    title: String,
    content: String,
    timeStamp: String
});

// model for blog post
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// create blog post
app.post('/api/blogPost', async (req, res) => {
    try {
        const blogPost = new BlogPost({
            author: "test",
            title: req.body.title,
            content: req.body.content,
            timeStamp: req.body.timeStamp
        });
        await blogPost.save();
        res.send(blogPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// read blog posts
app.get('/api/blogPosts', async (req, res) => {
    try {
        let blogPosts = await BlogPost.find();
        res.send(blogPosts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

// notes
// Schema for blog post
// const blogPostSchema = new mongoose.Schema({
//     author: String,
//     title: String,
//     tag: String,
//     path: String,
//     content: String,
//     timeStamp: String
// });

// Model for blog post
// const BlogPost = new mongoose.model('BlogPost', blogPostSchema);

// Upload photo
// const upload = multer({
//     dest: '../front-end/public/images',
//     limits: {
//         fileSize: 10000000
//     }
// });

// app.post('/api/photos', upload.single('photo'), async (req, res) => {
//     if (!req.file) {
//         return res.sendStatus(400);
//     }
//     res.send({
//         path: "/images/" + req.file.filename
//     });
// });

// Create blog post
// app.post('/api/blogPosts', async (req, res) => {
//     let blogPost = new BlogPost({
//         author: req.body.author,
//         title: req.body.title,
//         tag: req.body.tag,
//         path: req.body.path,
//         content: req.body.content,
//         timeStamp: req.body.timeStamp
//     });
//     try {
//         await blogPost.save();
//         res.send(blogPost);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// Read all blog posts
// app.get('/api/blogPosts', async (req, res) => {
//     try {
//         let blogPosts = await BlogPost.find();
//         res.send(blogPosts);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });