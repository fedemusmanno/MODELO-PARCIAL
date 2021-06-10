<template>
  <div id="app" class="container-fluid mt-3">
    <div class="jumbotron">
      <h1><i>NT - Modelo de Parcial</i></h1>
      <br>
      <Navbar />
      <br>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
}

h1{
  color: rgb(24, 24, 104);
}

.jumbotron{
  padding: 32px
}

</style>
