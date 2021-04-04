<template>
    <div class="home container">
        <p>Select favorite author:</p>
        <div class="btn-group mb-4" role="group">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="selectAuthor()">All</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
        </div>
        <br>

        <div v-if="author">
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
                    console.log(error);
                }
            },

            async getBlogs() {
                try {
                    const response = await axios.get(`/api/authors/${this.author._id}/blogs`);
                    this.blogs = response.data;
                } catch (error) {
                    console.log(error);
                }
            },

            selectAuthor(author) {
                this.author = author;
                this.getBlogs();
                // Change style of button
            },

            active(author) {
                return (this.author && author._id === this.author._id);
            }
        }
    }
</script>

<style scoped>
/* POSTCARD-WRAPPER */
.postcard-wrapper {
    margin-bottom: 12px;
}

/* AUTHOR */
.author {
    margin-bottom: 2px;
    font-size: medium;
    font-weight: 450;
}

/* TIMESTAMP */
.timestamp {
    font-size: small;
    font-style: italic;
}

/* POSTCARD */
.postcard {
    margin-bottom: 8px;
}

/* TITLE */
.title {
    padding: 12px 8px;
    font-size: large;
    font-weight: 600;
}

/* THUMBNAIL */
.thumbnail {
    width: 304px;
    height: 304px;
    object-fit:cover;
}

/* CONTENT */
.content {
    padding: 0px 8px;
}

p {
    margin-top: 8px;
    margin-bottom: 0;
}

/* TAG */
.tag {
    border: 1px solid #2c3e50;
    border-radius: 14px;
    display: inline-block;
    padding: 3px 5px;
    font-size: small;
    font-weight: 550;
}
</style>