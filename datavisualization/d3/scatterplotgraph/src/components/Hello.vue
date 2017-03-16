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

      const w = 1000
      const h = 500
      const padding = 50

      const xScale = d3.scaleLinear()
      .domain([d3.max(dataset, d => d.Seconds), d3.min(dataset, d => d.Seconds)])
      .range([padding, w - padding])

      const yScale = d3.scaleLinear()
      .domain([d3.max(dataset, d => d.Place), d3.min(dataset, d => d.Place)])
      .range([h - padding, padding])

      const svg = d3.select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)

      svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.Seconds))
      .attr('cy', d => yScale(d.Place))
      .attr('r', 5)
      .attr('fill', d => {if(d.Doping === ''){
          return 'green'
        } else {
          return 'red'
        }
      })
      .on('mouseover', (d) => {
        tooltip.style('visibility', 'visible')
        tooltip.html(d.Name + ' ' + d.Nationality + '<br />Time: ' +
                      d.Time + ' in ' + d.Year + '<br /> ' +
                      d.Doping)
      })
      .on('mousemove', d => {
        tooltip.style('top', (d3.event.pageY - 50) + 'px').style('left', (d3.event.pageX + 5) + 'px')
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden'))

      const xScaleAxis = d3.scaleLinear()
      .domain([d3.max(dataset, d => d.Seconds * 1000), d3.min(dataset, d => d.Seconds * 1000)])
      .range([padding, w - padding])

      const xAxis = d3.axisBottom(xScaleAxis)
      .tickFormat(d3.timeFormat("%M:%S"))

      svg.append('g')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis)

      const yAxis = d3.axisLeft(yScale)

      const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')

      svg.append('g')
      .attr('transform', 'translate(' + padding + ', 0)')
      .call(yAxis)

      svg.append('text')
      .attr("y", padding + 20)
      .attr('x', - 2.1 * padding)
      .attr("transform", "rotate(-90)")
      .text('Ranking')

      svg.append('text')
      .attr("y", h - padding - 10)
      .attr('x', w - 2 * padding)
      .text('Time')

      svg.append('text')
      .attr("text-anchor", "middle")
      .attr("y", padding)
      .attr('x', w/2)
      .style('font-size','28px')
      .text('Doping on Alpe d\'Huez')

      svg.append('text')
      .attr("y", h/2)
      .attr('x', w - 3 * padding)
      .text('Doping')

      svg.append('text')
      .attr("y", h/2 + 20)
      .attr('x', w - 3 * padding)
      .text('Clean')

      svg.append('circle')
      .attr("cy", h/2 + 15)
      .attr('cx', w - 3 * padding - 10)
      .attr('r', 5)
      .attr('fill', 'green')

      svg.append('circle')
      .attr("cy", h/2 - 5)
      .attr('cx', w - 3 * padding - 10)
      .attr('r', 5)
      .attr('fill', 'red')

    })
  }
}
</script>

<style>

body {
  display: flex;
  justify-content: center;
  margin-top: 8%;
  background: #d6e3f8;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

svg {
  background: #FEF5EF;
  -webkit-box-shadow: 8px 9px 25px 4px rgba(40,37,10,0.58);
  -moz-box-shadow: 8px 9px 25px 4px rgba(40,37,10,0.58);
  box-shadow: 8px 9px 25px 4px rgba(40,37,10,0.58);
}

.tooltip {
  position: absolute;
  z-index: 10;
  visibility: hidden;
  background: #d6e3f8;
  border-radius: 5px;
  padding: 5px;
  -webkit-box-shadow: 8px 9px 25px 4px rgba(40,37,10,0.58);
  -moz-box-shadow: 8px 9px 25px 4px rgba(40,37,10,0.58);
  box-shadow: 8px 9px 25px 4px rgba(90,70,90,0.58);
}
</style>
