import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import store from './store'

Vue.use(VueRouter)
import Home from './components/Home.vue'
import Signin from './components/Signin.vue'
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/signin', component: Signin }
  ]
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
