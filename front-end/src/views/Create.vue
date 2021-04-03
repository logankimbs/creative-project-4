<template>
    <div class="create">
        <div class="form">
            <label for="author">Create Author:</label> <br>
            <input v-model="author"> <br>
            <button @click="createAuthor">Create</button>
        </div> <br><hr>

        <!-- <div class="form">
            <label for="title">Title:</label> <br>
            <input v-model="title"> <br><br>
            <label for="tag">Tag:</label> <br>
            <input v-model="tag"> <br><br>
            <label for="photo">Thumbnail:</label> <br>
            <input type="file" name="photo" @change="fileChanged"> <br><br>
            <textarea v-model="content" placeholder="Add content..." cols="30" rows="10"></textarea> <br>
            <button @click="submit">Submit</button>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios';
// import moment from 'moment';

export default {
    name: 'Create',
    data() {
        return {
            author: "",
            title: "",
            tag: "",
            file: null,
            content: "",

            addAuthor: null
        }
    },
    methods: {
        async createAuthor() {
            try {
                let response2 = await axios.post('/api/authors', {
                    author: this.author
                });
                this.addAuthor = response2.data;
            } catch (error) {
                console.log(error);
            }
            this.author = "";
        },
        // fileChanged(event) {
        //     this.file = event.target.files[0];
        // },
        // async submit() {
        //     try {
        //         const formData = new FormData();
        //         formData.append('photo', this.file, this.file.name);
        //         let response1 = await axios.post('/api/photos', formData);
        //         let response2 = await axios.post('/api/blogPosts', {
        //             title: this.title,
        //             tag: this.tag,
        //             path: response1.data.path,
        //             content: this.content,
        //             timeStamp: moment().format('MMMM Do YYYY')
        //         });
        //         this.addPost = response2.data;
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     this.author = "";
        //     this.title = "";
        //     this.tag = "";
        //     this.file = null;
        //     this.content = "";
        // } 
    }
}
</script>