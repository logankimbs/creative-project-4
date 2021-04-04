<template>
    <div class="create container">
        <h1>Create</h1>
        <div>
            <p>You can either choose an existing author or create a new one.</p>
            <div class="mb-3">
                <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary btn-sm" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
                </div>
            </div>
            <form class="mb-3" @submit.prevent="createAuthor">
                <div>
                    <label class="form-label">New Author:</label>
                    <input type="text" class="form-control" v-model="authorName">
                </div>
                <br>
                <button type="submit" class="btn btn-primary">Create Author</button>
            </form>
        </div>
        <div class="mb-3" v-if="author">
            <form @submit.prevent="createBlog">
                <div class="mb-3">
                    <label class="form-label">Author</label>
                    <input type="text" class="form-control" :value="this.author.name" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Title:</label>
                    <input type="text" class="form-control" v-model="blogTitle">
                </div>
                <div class="mb-3">
                    <label class="form-label">Tag:</label>
                    <input type="text" class="form-control" v-model="blogTag">
                </div>
                <div class="mb-3">
                    <label class="form-label">Main Picture:</label>
                    <input type="file" name="photo" class="form-control" @change="fileChanged">
                </div>
                <div class="mb-3">
                    <textarea v-model="blogContent" class="form-control" placeholder="Add content..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Create Blog Post</button>
            </form>
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
                    this.blogTitle = '';
                    this.blogTag = '';
                    this.blogContent = '';
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
                this.getBlogs();
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

            async deleteItem(item) {
            try {
                await axios.delete("/api/items/" + item._id);
                this.findBlog = null;
                this.getBlog();
                return true;
            } catch (error) {
                // console.log(error);
            }
        },
        }
    }
</script>

<style scoped>

</style>