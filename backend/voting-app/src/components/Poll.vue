<template>
  <div class="container">
    <h3>{{this.$store.state.poll.result.name}}</h3>
    <p>
      Created by: {{this.$store.state.poll.result.owner}}
    </p>
    <div class="row">
      <div class="col-md-4 col-md-offset-1">
        <div
        class="pollBox"
        v-for="(option, index) in this.$store.state.poll.result.options"
        key="index"
        @click="vote(option.value)"
        >
        <label>{{option.value}}</label>
      </div>
      <div class="newOptionBox">
        <input
        class="inputNewOption"
        type="text"
        v-model="newOption"
        placeholder="Add new option"
        />
        <button class="btn btn-primary newOptionButton" @click="addOption">ADD</button>
      </div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">{{errorMessage}}</div>
    </div>
    <div class="col-md-6 col-md-offset-1">
      <Doughnut :chart-data="datacollection"></line-chart>
  </div>
  </div>
</div>
</template>

<script>
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'
import Doughnut from './Doughnut'

export default {
  data() {
    return {
      newOption: '',
      errorMessage: '',
      datacollection: null
    }
  },
  components: { Doughnut },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.getValues(),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [
              '#66BB6A',
              '#EC407A',
              '#7E57C2',
              '#5C6BC0',
              '#42A5F5',
              '#FF9800',
              '#AB47BC',
              '#26C6DA',
              '#EF5350',
              '#78909C',
            ],
            data: this.getVotes()
          }
        ]
      }
    },
    getValues() {
      let values = []
      this.$store.state.poll.result.options.map(option => {
        values.push(option.value)
      })
      return values
    },
    getVotes() {
      let votes = []
      this.$store.state.poll.result.options.map(option => {
        votes.push(option.votes)
      })
      return votes
    },
    vote(selectedOption) {
      let updatedPoll = this.$store.state.poll.result
      updatedPoll.options.map(option => {
        return option.value === selectedOption ? option.votes++ : option
      })
      updatedPoll.totalVotes++

      this.$store.dispatch('vote', updatedPoll )
    },
    addOption() {
      if(this.newOption != '' && this.newOption.length < 55) {
        this.errorMessage = ''
        let updatedPoll = this.$store.state.poll.result
        let newOption = {
          value: this.newOption,
          votes: 0
        }
        updatedPoll.options.push(newOption)
        this.$store.dispatch('addOption', updatedPoll)
        this.newOption = ''
      } else {
        this.errorMessage = 'Invalid input'
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchPollById', this.$route.params.id)
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      this.$nextTick(function() {
        this.fillData()
      })
      switch (mutation.type) {
        case 'VOTE':
        if(mutation.payload.confirmation === 'fail'){
          this.errorMessage = `You've already voted on this poll.`
        }
        this.fillData()
        break;
        case 'FETCH_POLL_BY_ID':
        this.fillData()
        break;
        default:
      }
    })
  }
}
</script>
