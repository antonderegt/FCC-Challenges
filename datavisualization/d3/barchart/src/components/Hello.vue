<template>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'hello',
  mounted () {
    this.$http.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((response) => {
      const dataset = response.data.data

      const w = 1000
      const h = 500
      const padding = 50

      const xScale = d3.scaleLinear()
      .domain([d3.min(dataset, (d) => d[0].split('-')[0]), d3.max(dataset, (d) => d[0].split('-')[0])])
      .range([padding, w - padding])

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([padding, h - padding])

      const yScaleAxis = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([h - padding, padding])

      const svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

      svg.append("text")
      .attr("x", 500)
      .attr("y", 100)
      .attr("text-anchor", "middle")
      .attr('class', 'title')
      .text("Gross Domestic Product");

      svg.append("text")
      .attr("x", 500)
      .attr("y", h - 18)
      .attr("text-anchor", "middle")
      .attr('class', 'desc')
      .text(response.data.description);

      const formatCurrency = d3.format("$,.2f");
      const formatTime = d3.timeFormat("%Y - %B");

      const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')

      svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', d => {
        let year = d[0].split('-')[0]
        year = parseInt(year)
        switch (d[0].split('-')[1]) {
          case '01':
          break;
          case '04':
          year += .25
          break;
          case '07':
          year += .50
          break;
          case '10':
          year += .75
          break;
          default:
        }
        return xScale(year)
      })
      .attr('width', 4)
      .attr('y', d => h - yScale(d[1]))
      .attr('height', d => yScale(d[1]) - padding)
      .attr('class', 'bar')
      .on('mouseover', (d) => {
        tooltip.style('visibility', 'visible')
        tooltip.html('<b>' + formatCurrency(d[1]) + ' Billion</b><br /> ' + formatTime(new Date(d[0])))
      })
      .on('mousemove', d => {
        tooltip.style('top', (d3.event.pageY - 50) + 'px').style('left', (d3.event.pageX + 5) + 'px')
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden'))

      // Axes
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(""))

      svg.append('g')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis)

      const yAxis = d3.axisLeft(yScaleAxis)

      svg.append('g')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(yAxis)

      svg.append("text")
      .attr("text-anchor", "end")
      .attr("y", padding)
      .attr('x', -padding)
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .text("Gross Domestic Product, USA");

    })
  }
}
</script>

<style>
body {
  display: flex;
  justify-content: center;
  margin-top: 8%;
  background: #85E29A;
}

svg {
  background: #fff;
  -webkit-box-shadow: 8px 9px 25px 4px rgba(0,37,0,0.58);
  -moz-box-shadow: 8px 9px 25px 4px rgba(0,37,0,0.58);
  box-shadow: 8px 9px 25px 4px rgba(0,37,0,0.58);
}
.bar {
  fill: #BCB6FF;
}
.bar:hover {
  fill: #B8E1FF;
}

.title {
  font-size: 30px;
  fill: #536D67;
}

.desc {
  font-size: 9px;
  fill: #536D67;
}

.tooltip {
  position: absolute;
  z-index: 10;
  visibility: hidden;
  background: #94FBAB;
  border-radius: 5px;
  padding: 5px;
  width: 140px;
  height: 40px;
  -webkit-box-shadow: 8px 9px 25px 4px rgba(0,37,0,0.58);
  -moz-box-shadow: 8px 9px 25px 4px rgba(0,37,0,0.58);
  box-shadow: 8px 9px 25px 4px rgba(0,37,0,0.58);
}
</style>
