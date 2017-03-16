<template>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'hello',
  mounted () {
    this.$http.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => {
      const dataset = response.body

      const w = 500
      const h = 500
      const padding = 50

      const svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

body {
  display: flex;
  justify-content: center;
  margin-top: 8%;
}

svg {
  background: red;
}
</style>
