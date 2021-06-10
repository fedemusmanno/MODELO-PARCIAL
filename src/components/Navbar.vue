<template>

  <section class="src-components-navbar">
    <nav class="navbar navbar-expand-md navbar-dark ">
      <router-link to="/">
        <a class="navbar-brand" href="#">Inicio</a>
      </router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/form">
              <a class="nav-link" href="#">Formulario</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/preguntas">
              <a class="nav-link" href="#">Preguntas</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </section>
</template>

<script lang="js">
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
  .src-components-navbar{
      background-color: rgb(95, 86, 105);
      color: white;
      border-radius: 6px;
  }
</style>