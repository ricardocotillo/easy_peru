<template>
  <main>
    <div class="container">
      <h1 class="is-size-1">Easy Perú</h1>
      <Home />
    </div>
  </main>
</template>

<script>
import Home from './views/home.view'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
