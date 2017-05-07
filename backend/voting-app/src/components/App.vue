<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/"><span class="glyphicon glyphicon-check" aria-hidden="true"></span> Voting App</router-link>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="this.$store.state.user.username">
            <router-link to="/mypolls">My Polls</router-link>
          </li>
          <li v-if="this.$store.state.user.username">
            <router-link to="/addpoll">Add Poll</router-link>
          </li>
          <li v-if="this.$store.state.user.username">
            <a href="/logout" @click="signOut">Log Out</a>
          </li>
          <li v-else>
            <router-link to="/signin">Sign In</router-link>
          </li>
        </ul>
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

.pollBox {
  margin-top: 1%;
  height: 36px;
  border: 0px;
  border-radius: 2px;
  background: #ddd;
  cursor: pointer;
}

.pollBox:hover {
  background: #eee
}

.newOptionBox {
  margin-top: 1%;
  display: flex;
  justify-content: space-around;
}

.inputNewOption {
  flex: 3;
  min-height: 36px;
}

.newOptionButton {
  flex: 1;
}
</style>
