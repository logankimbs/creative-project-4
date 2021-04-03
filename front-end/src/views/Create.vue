<template>
    <div class="create">
        <div class="form">
            <h2>Create Post:</h2>
            <input v-model="title" placeholder="Title"> <br>
            <input v-model="author" placeholder="Author"> <br>
            <input type="file"> <br>
            <textarea v-model="content"></textarea> <br>
            <button @click="createPost">Create</button>
        </div> <br><hr>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    name: 'Create',
    data() {
        return {
            title: '',
            author: '',
            content: ''
        }
    },
    created() {
        // this.getAuthors();
    },
    methods: {
        // async createPost() {
        //     try {
        //         let 
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     this.author = '';
        // }
    }
}
</script>

<style scoped>

</style>