<template lang="html">
  <div class="stockBox">
      {{stock.symbol}}
    <button class="deleteButton" @click="deleteStock(stock)">&times;</button>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  methods: {
    deleteStock(stock) {
      this.$store.dispatch('deleteStock', stock.symbol)
      this.$socket.emit('deletestock', stock.symbol)
    }
  }
}
</script>

<style lang="css">
.stockBox {
  background-color: #42A5F5;
  min-height: 50px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.deleteButton {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0px;
  background-color: #D9534F;
  border-radius: 5px;
  color: white;
  width: 20px;
  height: 20px;
}
.deleteButton:hover {
  background-color: #C9302C;
}
</style>
