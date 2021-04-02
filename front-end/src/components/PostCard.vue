<template>
<div class="postcard-wrapper">
    <!-- AUTHOR -->
    <div class="author">Logan Kimball</div>

    <!-- TIMESTAMP -->
    <div class="timestamp">April 1, 2021</div>

    <!-- POSTCARD -->
    <div class="postcard">

        <!-- TITLE -->
        <div class="title">How to Build a Website</div>

        <!-- THUMBNAIL -->
        <img class="thumbnail" src="../assets/code.png">

        <!-- CONTENT -->
        <p class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Purus in mollis nunc sed id semper risus in. In nisl nisi scelerisque eu. Integer feugiat scelerisque varius morbi enim nunc faucibus a.
            Sit amet mattis vulputate enim. Commodo odio aenean sed adipiscing diam. Donec adipiscing tristique risus nec feugiat in fermentum. Turpis
            egestas maecenas pharetra convallis posuere morbi leo urna. At varius vel pharetra vel turpis nunc eget. Pellentesque elit ullamcorper
            dignissim cras tincidunt. Dictumst quisque sagittis purus sit amet. Diam vel quam elementum pulvinar etiam non quam. Elementum sagittis
            vitae et leo duis. Dignissim convallis aenean et tortor at risus viverra adipiscing. Duis at tellus at urna. Enim nulla aliquet porttitor
            lacus luctus accumsan tortor. Nec ullamcorper sit amet risus nullam.
        </p>

    </div>

    <!-- TAG -->
    <div class="tag">WEB DEVELOPMENT</div>
</div>
</template>

<script>
export default {
    name: 'PostCard',
    props: {
        msg: String
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
