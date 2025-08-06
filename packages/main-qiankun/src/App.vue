<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vue-app2">Vue2</router-link> |
      <router-link to="/vue-app2/about">Vue2 About</router-link> |
      <router-link to="/vue-app3">Vue3</router-link> |
      <router-link to="/vue-app3/about">Vue3 About</router-link>
    </nav>
    <router-view/>
    <!-- 微应用容器 -->
    <div id="subapp-container"></div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
