<template>
  <div class="container">
    <input type="text" v-model="location" placeholder="Location" @keyup.enter="setLocation"/>
    <button class="btn" @click="setLocation">Search</button>
    <div v-if="loading" >
      Loading...
    </div>
    <Bar v-for="(bar, index) in this.$store.state.bars" :bar="bar" />
  </div>
</template>

<script>
import Bar from './Bar.vue'

export default {
  data() {
    return {
      loading: false,
      location: ''
    }
  },
  methods: {
    setLocation() {
      this.loading = true
      this.$store.dispatch('saveLocation', this.location)
      this.$store.dispatch('getBars', this.location)
    }
  },
  mounted() {
    if(this.$store.state.location) {
      this.loading = true
      this.$store.dispatch('getBars', this.$store.state.location)
    } else {
      this.loading = true
      this.$store.dispatch('getLocation', this.$store.state.location)
    }

    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'GET_BARS':
          this.loading = false
          this.$store.dispatch('getGoingUsers')
          break;
        case 'SAVE_LOCATION':
          this.$store.dispatch('getBars', this.$store.state.location)
          break;
        default:
      }
    })
  },
  components: {
    Bar
  }
}
</script>
