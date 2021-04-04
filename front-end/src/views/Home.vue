<template>
    <div class="home container">
        <h1>Home</h1>
        <p>Please select your favorite author.</p>
        <div class="btn-group mb-3" role="group">
            <button type="button" class="btn btn-outline-secondary btn-sm" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
        </div>
        <div v-if="author">
            <p>Viewing posts by {{this.author.name}}</p>
            <div v-for="blog in blogs" :key="blog.id">
                <div class="card border-light mb-3">
                    <div class="card-header">{{blog.author.name}}
                        <br>
                        <small class="text-muted">{{blog.timeStamp}}</small>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{blog.title}}</h5>
                        <img src="../assets/code.png" width="100%">
                        <p class="card-text">{{blog.content}}</p>
                        <br>
                        <span class="badge bg-primary">{{blog.tag}}</span>
                    </div>
                </div>
            </div>
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
                blogTag: '',
                blogContent: ''
            }
        },
        
        created() {
            this.getAuthors();
        },
        
        methods: {
            async getAuthors() {
                try {
                    const response = await axios.get("/api/authors");
                    this.authors = response.data;
                    this.authorName = '';
                } catch (error) {
                    // console.log(error);
                }
            },

            async getBlogs() {
                try {
                    const response = await axios.get(`/api/authors/${this.author._id}/blogs`);
                    this.blogs = response.data;
                } catch (error) {
                    // console.log(error);
                }
            },

            selectAuthor(author) {
                this.author = author;
                this.getBlogs();
            },

            active(author) {
                return (this.author && author._id === this.author._id);
            }
        }
    }
</script>

<style scoped>

</style>