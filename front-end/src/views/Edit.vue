<template>
    <div class="edit container">
        <h1>Edit</h1>
        <p>Choose an author whos blog you would like to edit.</p>
        <div class="mb-3">
            <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary btn-sm" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
            </div>
        </div>
        <div class="mb-3" v-if="author">
            <p>Which of their blogs would you like to edit?</p>
            <div v-for="blog in blogs" :key="blog.id">
                <button type="button" class="btn btn-outline-success btn-sm mb-1" @click="selectBlog(blog)">{{blog.title}}</button> 
            </div>
        </div>
        <div v-if="findBlog">
            <div class="mb-3">
                <label class="form-label">Author</label>
                <input type="text" class="form-control" :value="this.author.name" disabled>
            </div>
            <div class="mb-3">
                <label class="form-label">Title:</label>
                <input type="text" class="form-control" v-model="findBlog.title">
            </div>
            <div class="mb-3">
                <label class="form-label">Tag:</label>
                <input type="text" class="form-control" v-model="findBlog.tag">
            </div>
            <div class="mb-3">
                <textarea v-model="findBlog.content" class="form-control" placeholder="Add content..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary mb-1" @click="updateBlog(findBlog)">Update Blog Post</button>
            <br>
            <button type="submit" class="btn btn-danger" @click="deleteBlog(findBlog)">DeleteBlog Post</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'Create',
data() {
            return {
                authors: [],
                author: null,
                authorName: '',
                blogs: [],
                blogTitle: '',
                blogTag: '',
                blogContent: '',
                show: 'all',
                file: null,
                findBlog: null
            }
        },
        
        created() {
            this.getAuthors();
        },

        computed: {
            activeBlogs() {
                return this.blogs.filter(blog => {
                    return blog;
                });
            },

            suggestions() {
            let blogs = this.blogs.filter(blog => blog.title.toLowerCase().startsWith(this.findBlog.toLowerCase()));
            return blogs.sort((a, b) => a.title > b.title);
        }
        },
        
        methods: {
            async createAuthor() {
                try {
                    await axios.post("/api/authors", {
                        name: this.authorName
                    });
                    await this.getAuthors();
                } catch (error) {
                    console.log(error);
                }
            },

            fileChanged(event) {
                this.file = event.target.files[0];
            },

            async createBlog() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file, this.file.name);
                    let r1 = await axios.post('/api/photos', formData);
                    await axios.post(`/api/authors/${this.author._id}/blogs`, {
                        title: this.blogTitle,
                        tag: this.blogTag,
                        path: r1.data.path,
                        content: this.blogContent,
                        timeStamp: moment().format('MMMM Do YYYY')
                    });
                    this.title = '';
                    this.content = '';
                    this.getBlogs();
                } catch (error) {
                    console.log(error);
                }
            },

            async getAuthors() {
                try {
                    const response = await axios.get("/api/authors");
                    this.authors = response.data;
                    this.authorName = '';
                } catch (error) {
                    console.log(error);
                }
            },

            selectAuthor(author) {
                this.author = author;
                this.noCreate = false;
                this.findBlog = null;
                this.getBlogs();
            },

            selectBlog(blog) {
                this.findBlog = blog; 
            },

            selectAuthorsBlog(author) {
                this.author = author;
                this.noCreate = false;
                this.getBlogs();
            },

            async getBlogs() {
                try {
                    const response = await axios.get(`/api/authors/${this.author._id}/blogs`);
                    this.blogs = response.data;
                } catch (error) {
                    console.log(error);
                }
            },

            active(author) {
                return (this.author && author._id === this.author._id);
            },

            showActive() {
                this.show = 'active';
            },

            showCreate() {
                this.showOptions = false;
                this.toEdit = false;
                this.toCreate = true;
                this.editBlog = false;
            },

            showEdit() {
                this.showOptions = false;
                this.toEdit = true;
                this.toCreate = false;
            },

            async updateBlog(currentBlog) {
                try {
                    await axios.put(`/api/authors/${currentBlog.author._id}/blogs`, {
                        title: this.findItem.title,
                        description: this.findItem.description,
                        tag: this.findBlog.tag,
                        content: this.findBlog.content
                    });
                    this.findBlog = null;
                    this.getBlogs();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },

            async deleteBlog(findBlog) {
                console.log(findBlog);
                console.log(findBlog.author._id);
                console.log(findBlog._id);

                try {
                    await axios.delete(`/api/authors/${findBlog.author._id}/blogs/${findBlog._id}`);
                    this.findBlog = null;
                    this.getBlog();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style scoped>

</style>