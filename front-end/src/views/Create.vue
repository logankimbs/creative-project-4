<template>
    <div class="create">
        <div class="form">
            <h2>Create Author:</h2>
            <input v-model="author"> <br>
            <button @click="createAuthor">Create</button>
        </div> <br><hr>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Create',
    data() {
        return {
            author: '',
            addAuthor: null
        }
    },
    methods: {
        async createAuthor() {
            try {
                let response = await axios.post('/api/authors', {
                    name: this.author
                });
                this.addAuthor = response.data;
            } catch (error) {
                console.log(error);
            }
            this.author = '';
        }
    }
}
</script>