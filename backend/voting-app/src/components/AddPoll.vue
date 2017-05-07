<template>
  <div class="container">
    <div v-if="this.$store.state.user.username" class="col-md-6 col-md-offset-3">
      <h3>{{this.$store.state.user.username}} add a poll</h3>
      <h4>Poll name</h4>
      <input
        class="inputOption"
        type="text"
        placeholder="Add a name"
        v-model="name"
      />
      <h4>Options</h4>
      <div class="inputContainer">
        <input
          class="inputOption"
          v-for="(option, index) in options"
          key="index"
          type="text"
          placeholder="Add an option"
          v-model="options[index].value"
        />
      </div>
      <button class="btn btn-primary" @click="addOption">Add Option</button>
      <button class="btn btn-primary" @click="addPoll">Add Poll</button>
    </div>
    <div v-else>
      <router-link to="/signin"><h3>Click here to sign in</h3></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      options: [
        {value: '', votes: 0},
        {value: '', votes: 0},
        {value: '', votes: 0}
      ]
    }
  },
  methods: {
    addPoll() {
      // TODO: Check if options are empty and skip those
      let newPoll = {
        _id: '1234567890',
        name: this.name,
        options: this.options,
        totalVotes: 0,
        owner: this.$store.state.user.username
      }
      this.$store.dispatch('addPoll', newPoll)
      .then(() => {
        this.$router.push(`/mypolls`)
      })
    },
    addOption() {
      this.options.push({value: '', votes: 0})
    }
  },
  mounted() {
    this.$store.dispatch('getUser')
  }
}
</script>

<style scoped>
.inputContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background: #ccc;
}
.inputOption {
  flex: 1;
}
</style>
