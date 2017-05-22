<template>
  <div>
    <div class="container">
      <StockGraph class="graphBox" :chart-data="datacollection"/>
      <div class="stockContainer">
        <div class="newStockContainer">
          <input v-model="stockSymbol" @keyup.enter="addStock" placeholder="Symbol Name">
          <button class="btn btn-primary" @click="addStock">Add</button>
        </div>
        <div class="stockContainer">
          <Stock
            v-for="(stock, id) in this.$store.state.stocks"
            :key="id"
            :stock="stock"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import StockGraph from './StockGraph'
import Stock from './Stock.vue'

export default {
  data() {
    return {
      stockSymbol: '',
      datacollection: null,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      colors: [
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
      ]
    }
  },
  sockets:{
    'newstock'(val) {
      this.$store.dispatch('resetStocks')
      val.map(stock => {
        this.getStockData(stock.symbol)
      })
    },
    'deletestock'(symbol) {
      this.$store.dispatch('resetStocks')
      .then(() => {
        this.$store.dispatch('getStocks')
      })
    }
  },
  methods: {
    addLine() {
      let datasets = [];
      let count = this.$store.state.stocks.length;
      for (let j=0; j<count; j++) {
        let data = this.$store.state.stocks[j].data.map(stock => {
          return stock[1]
        })
        datasets[j] = {
          fill: false,
          borderColor: this.colors[Math.floor(Math.random() * 10)],
          label: this.$store.state.stocks[j].symbol,
          data
        }
      }

      let today = new Date()
      let thisMonth = today.getMonth()
      let thisYear = today.getFullYear()
      let months = []

      for(let i = thisMonth - 1; i < 12; i++) {
        months.push(`${this.months[i]} ${thisYear-1}`)
      }

      for(let i = 0; i <= thisMonth; i++) {
        months.push(`${this.months[i]} ${thisYear}`)
      }

      let mydata = {
        labels: months,
        datasets
      }

      this.datacollection = mydata
    },
    initGraphLines() {
      let datasetValue = [];
      let count = 1;
      for (let j=0; j<count; j++) {
          datasetValue[j] = {
              fillColor: 'rgba(220,220,220,0.5)',
              strokeColor:'rgba(220,220,220,1)',
              label: 'Empty',
              data: null
          }
      }
      let mydata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: datasetValue
      }

      this.datacollection = mydata
    },
    addStock() {
      // $socket is socket.io-client instance
      this.$socket.emit('addstock', this.stockSymbol)
      this.stockSymbol = ''
    },
    getStockData(symbol) {
      this.$store.dispatch('getStock', symbol)
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      this.$nextTick(() => {
        this.initGraphLines()
        this.$nextTick(() => {
          this.initGraphLines()
        })
      })
      switch (mutation.type) {
        case 'GET_STOCK':
        this.$nextTick(() => {
          this.addLine()
          this.$nextTick(() => {
            this.addLine()
          })
        })
        break;
        case 'DELTE_STOCK':
        this.$nextTick(() => {
          this.addLine()
          this.$nextTick(() => {
            this.addLine()
          })
        })
        break;
        default:
      }
    })
    this.$store.dispatch('getStocks');
  },
  components: {
    Stock, StockGraph
  }
}
</script>

<style lang="css">
input {
  width: 100px;
  margin: 2px;
}

button {
  width: 100px;
  margin: 2px;
}

.container {
  display: flex;
  width: 100%;
  height: 500px;
}

.graphBox {
  flex: 1;
}

.newStockContainer {
  display: flex;
  height: 50px;
  justify-content: center;
}

.stockContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
