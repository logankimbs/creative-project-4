<template>
    <div class="home">
        <div id="projects">
            <button :class="{selected: active(author)}" v-for="author in authors" :key="author.id" @click="selectAuthor(author)">{{author.name}}</button>
        </div>
        <br>
        <div v-if="author">
            <div v-for="blog in blogs" :key="blog.id">
                <div class="postcard-wrapper">
                    <div class="author">{{   blog.author.name   }}</div>
                    <div class="timestamp">{{   blog.timeStamp   }}</div>
                    <div class="postcard">
                        <div class="title">{{   blog.title   }}</div>
                        <img class="thumbnail" :src="blog.path">
                        <p class="content">{{   blog.content   }}</p>
                    </div>
                    <div class="tag">{{   blog.tag   }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

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