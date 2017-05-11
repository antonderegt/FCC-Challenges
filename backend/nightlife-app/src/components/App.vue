<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">Where do you want to go tonight?</a>
        </div>
        <div class="navbar-right">
          <div v-if="this.$store.state.user.displayName" class="navbar-text">
            {{this.$store.state.user.displayName}}
          </div>
          <a v-if="this.$store.state.user.displayName" class="btn btn-default navbar-btn" href="/logout" @click="signOut">Log Out</a>
          <router-link v-else to="/signin" class="btn btn-default navbar-btn">Sign In</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
    this.$store.dispatch('getGoingUsers')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
