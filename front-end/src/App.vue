<template>
<div id="app">
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/create">Create</router-link> |
        <router-link to="/edit">Edit</router-link>
    </div>
    <router-view/>
    <footer class="footer mt-auto py-3 bg-light">
        <div class="container text-center">
            <span class="text-muted"><a href="https://github.com/logankimbs/creative-project-4" target="blank">GitHub</a></span>
        </div>
    </footer>
</div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.footer {
    position: absolute;
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
}
</style>
