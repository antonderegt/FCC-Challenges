<template>
  <div class="flexBox">
    <div class="imgBox">
      <img :src="bar.image_url" :alt="bar.name" />
    </div>
    <div class="textBox">
      <a :href="bar.url" target="_blank" rel="noopener"><h3>{{bar.name}}</h3></a>
      <button v-if="userIsGoing" @click="handleClick" class="btn btn-danger">Back out</button>
      <button v-else @click="handleClick" class="btn btn-success">Go</button> {{numberOfPeopleGoing}} people are going.
      <p>Address: {{bar.location.display_address[0]}}, {{bar.location.display_address[1]}}, {{bar.location.display_address[2]}}</p>
      <p>Rating: {{bar.rating}}</p>
      <p>Price: {{bar.price}}</p>
      <p>Review: {{review}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userIsGoing: false,
      numberOfPeopleGoing: 0,
      review: 'Loading reviews...',
    }
  },
  props: ['bar'],
  methods: {
    handleClick() {
      this.$store.dispatch('getUser')
      if(!this.$store.state.user.username) {
        this.$router.push('/signin')
      } else {
        let idBarAndUser = {
          idBar: this.bar.id,
          idUser: this.$store.state.user.username
        }
        if(this.userIsGoing) {
          this.$store.dispatch('userIsBackingOut', idBarAndUser)
        } else {
          this.$store.dispatch('userIsGoing', idBarAndUser)
        }
      }
    },
    setGoingUsersCount() {
      this.userIsGoing = false
      this.$store.state.goingUsers.map(bar => {
        if(bar.idBar === this.bar.id) {
          this.numberOfPeopleGoing = bar.goingUsers.length
          bar.goingUsers.map(user => {
            if(user === this.$store.state.user.username) {
              this.userIsGoing = true
            }
          })
        }
      })
    }
  },
  created() {
    axios.post(`/api/yelp/review`, { id: this.bar.id })
    .then( response => {
      this.review = response.data.result
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setGoingUsersCount()

    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'GOING_USERS':
          this.setGoingUsersCount()
          break;
        case 'GET_BARS':
          this.numberOfPeopleGoing = 0
          break;
        default:
      }
    })
  }
}
</script>

<style scoped>
.flexBox {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  background: lightGray;
  margin: 10px;
}

.imgBox {
  flex: 1;
}

.textBox {
  flex: 3;
  padding-left: 10px;
  min-width: 150px;
}

img {
  min-width: 250px;
  width: 100%;
  height: 200px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

p {
  margin: 0;
  padding: 0;
}
</style>
