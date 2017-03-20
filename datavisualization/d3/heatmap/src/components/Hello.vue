<template>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'hello',
  mounted () {
    this.axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then((response) => {
      const dataset = response.data

      const w = 1000
      const h = 500
      const pTop = 50
      const pRight = 50
      const pLeft = 50
      const pBottom = 50

      const svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

      console.log(dataset);

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  background: #eee;
  display: flex;
  justify-content: center;
  margin-top: 8%;
}
svg {
  background: #fff
}
</style>
