import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import store from './store'

Vue.use(VueRouter)
import Home from './components/Home.vue'
import PollsList from './components/PollsList.vue'
import AddPoll from './components/AddPoll.vue'
import MyPolls from './components/MyPolls.vue'
import Signin from './components/Signin.vue'
import Profile from './components/Profile.vue'
import Poll from './components/Poll.vue'
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home,
      children: [
        { path: '', component: PollsList },
        { path: '/addpoll', component: AddPoll },
        { path: '/mypolls', component: MyPolls },
        { path: '/signin', component: Signin },
        { path: '/profile', component: Profile },
        { path: 'polls/:id', component: Poll }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
