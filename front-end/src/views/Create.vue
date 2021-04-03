<template>
    <div class="create">
        <div class="form">
            <label for="author">Author:</label> <br>
            <input v-model="author"> <br><br>
            <label for="title">Title:</label> <br>
            <input v-model="title"> <br><br>
            <label for="tag">Tag:</label> <br>
            <input v-model="tag"> <br><br>
            <label for="photo">Thumbnail:</label> <br>
            <input type="file" name="photo" @change="fileChanged"> <br><br>
            <textarea v-model="content" placeholder="Add content..." cols="30" rows="10"></textarea> <br>
            <button @click="submit">Submit</button>
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
            author: "",
            title: "",
            tag: "",
            file: null,
            content: "",

            addPost: null
        }
    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0];
        },
        async submit() {
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name);
                let response1 = await axios.post('/api/photos', formData);
                let response2 = await axios.post('/api/blogPosts', {
                    author: this.author,
                    title: this.title,
                    tag: this.tag,
                    path: response1.data.path,
                    content: this.content,
                    timeStamp: moment().format('MMMM Do YYYY')
                });
                this.addPost = response2.data;
            } catch (error) {
                console.log(error);
            }
            this.author = "";
            this.title = "";
            this.tag = "";
            this.file = null;
            this.content = "";
        } 
    }
}
</script>