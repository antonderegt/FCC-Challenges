<template>
  <div class="container">
    <h3>Click on a poll you want to vote on.</h3>
    <div class="row">
      <ul class="list-group col-md-6 col-md-offset-3">
        <button
          v-for="(poll, index) in this.$store.state.polls"
          @click="showPoll(poll)"
          class="list-group-item"
        >
          <span class="badge">{{poll.totalVotes}}</span>
          {{poll.name}}
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showPoll(poll) {
      this.$router.push(`polls/${poll._id}`)
    }
  },
  mounted() {
    this.$store.dispatch('fetchAllPolls')
  }
}
</script>

<style scoped>
button {
  text-align: center;
}
</style>
