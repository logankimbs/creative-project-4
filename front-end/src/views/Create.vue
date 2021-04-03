<template>
    <div class="create container">
        <div class="mb-3">
            <div id="projects">
                <button type="button" class="btn btn-outline-secondary" :class="{selected: active(author)}" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
            </div>
        </div>

        <form class="mb-3" @submit.prevent="createAuthor">
            <div>
                <label class="form-label">Name:</label>
                <input type="text" class="form-control" v-model="authorName">
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Create Author</button>
        </form>

        <div class="mb-3" v-if="author">
            <form @submit.prevent="createBlog">
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
            <!-- <ul>
                <li v-for="blog in blogs" :key="blog.id">
                    <label :class="{ blog: true}">
                        {{ blog.title }}
                    </label>
                </li>
            </ul> -->
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
                file: null
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
        }
    }
</script>

<style scoped>

</style>