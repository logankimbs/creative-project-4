<template>
    <div class="home">
        <div id="projects">
            <button :class="{selected: active(author)}" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
        </div>
        <br>
        <form @submit.prevent="createAuthor">
            <input type="text" v-model="authorName">
            <br>
            <button type="submit">Create Author</button>
        </form>
        <br>
        <div v-if="author">
            <form @submit.prevent="createBlog">
                <input type="text" v-model="blogTitle" placeholder="Title">
                <br>
                <textarea v-model="blogContent" placeholder="Add content..."></textarea>
                <br>
                <button type="submit">Create Blog Post</button>
            </form>

            <ul>
                <li v-for="blog in blogs" :key="blog.id">
                    <label :class="{ blog: true}">
                        {{ blog.title }}
                    </label>
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Home',
        
        data() {
            return {
                authors: [],
                author: null,
                authorName: '',
                blogs: [],
                blogTitle: '',
                blogContent: '',
                show: 'all'
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

            async createBlog() {
                try {
                    await axios.post(`/api/authors/${this.author._id}/blogs`, {
                        title: this.blogTitle,
                        content: this.blogContent
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