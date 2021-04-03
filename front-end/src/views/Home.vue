<template>
<div class="home">
    <div class="postcard-wrapper" v-for="blogPost in blogPosts" :key="blogPost.id">
        <div class="author">{{   blogPost.author   }}</div>
        <div class="timestamp">{{   blogPost.timeStamp   }}</div>
        <div class="postcard">
            <div class="title">{{   blogPost.title   }}</div>
            <img class="thumbnail" :src="blogPost.path">
            <p class="content">{{   blogPost.content   }}</p>
        </div>
        <div class="tag">{{   blogPost.tag   }}</div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            blogPosts: []
        }
    },
    created() {
        this.getBlogPosts()
    },
    methods: {
        async getBlogPosts() {
            try {
                let response = await axios.get("/api/blogPosts");
                this.blogPosts = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.postcard-wrapper {
    margin-bottom: 12px;
}

.author {
    margin-bottom: 2px;
    font-size: medium;
    font-weight: 450;
}

.timestamp {
    font-size: small;
    font-style: italic;
}

.postcard {
    margin-bottom: 8px;
}

.title {
    padding: 12px 8px;
    font-size: large;
    font-weight: 600;
}

.thumbnail {
    width: 304px;
    height: 304px;
    object-fit:cover;
}

.content {
    padding: 0px 8px;
}

p {
    margin-top: 8px;
    margin-bottom: 0;
}

.tag {
    border: 1px solid #2c3e50;
    border-radius: 14px;
    display: inline-block;
    padding: 3px 5px;
    font-size: small;
    font-weight: 550;
}
</style>