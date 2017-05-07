<template>
  <div v-if="this.$store.state.user.displayName" class="container">
    <h3>Polls created by: {{this.$store.state.user.username}}</h3>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div
          v-for="(poll, index) in this.$store.state.mypolls.result"
          key="index"
          class="newOptionBox"
        >
          <button class="myPoll inputNewOption" @click="showPoll(poll)">
            <span class="badge">{{poll.totalVotes}}</span>
            {{poll.name}}
          </button>
          <button class="btn btn-danger newOptionButton" @click="removePoll(poll)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <router-link to="/signin"><h3>Click here to sign in</h3></router-link>
  </div>
</template>

<script>
// TODO: Fetch on reload
export default {
  methods: {
    showPoll(poll) {
      this.$router.push(`polls/${poll._id}`)
    },
    removePoll(poll) {
      this.$store.dispatch('removePoll', poll._id)
      .then(() => this.$store.dispatch('fetchMyPolls', this.$store.state.user.username))
    }
  },
  // beforeCreate() {
  //   this.$store.dispatch('getUser')
  // },
  mounted() {
    this.$store.dispatch('getUser')
    this.$store.dispatch('fetchMyPolls', this.$store.state.user.username)
  }
}
</script>

<style scoped>
.myPoll {
  height: 36px;
  border: 0px;
  border-radius: 2px;
  background: #ddd;
  text-align: left;
  cursor: pointer;
}

.myPoll:hover {
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
