import * as d3 from 'd3'

let margin = { top: 0, left: 0, right: 0, bottom: 0 }

let height = 410 - margin.top - margin.bottom
let width = 350 - margin.left - margin.right

var container = d3.select("#chart-1")

let angleScale = d3
  .scaleBand()
  .range([0, Math.PI * 2])

let radius = 125

let radiusScale = d3
  .scaleLinear()
  .domain([0, 1])
  .range([0, radius])

let line = d3
  .radialLine()
  .angle(d => angleScale(d.COUNTRY))
  .radius(d => radiusScale(d.value))


d3.csv(require('./data/cat_count.csv'))
  .then(ready)
  .catch(err => console.log('Failed with', err))

function ready(datapoints) {
  container.selectAll('svg')
    .data(datapoints)
    .enter().append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', `translate(${width/2},${height/2})`)
    .each(function(d) {
      let svg = d3.select(this)
      let holder = svg
      let country = d

      let categories = customDatapoints.map(d => d.COUNTRY)
      angleScale.domain(categories)

      var bands = [2, 4, 6, 8, 100]

      holder
        .selectAll('.band-circle')
        .data(bands)
        .enter()
        .append('circle')
        .attr('r', d => radiusScale(d))
        .attr('fill', (d, i) => {
          if (i % 2 === 0) {
            return '#e8e7e5'
          } else {
            return '#f6f6f6'
          }
        })
        .lower()

      // holder
      //   .append('g')
      //   .attr('mask', `url(#${maskId})`)
      //   .attr('class', player.Team)
      //   .selectAll('.band-circle-colored')
      //   .data(bands)
      //   .enter()
      //   .append('circle')
      //   .attr('r', d => radiusScale(d))
      //   .lower()

      holder
        .selectAll('.category-title')
        .data(categories)
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', 12).attr('font-weight', 'bold')
        .text(d => d)
        .attr('x', 0)
        .attr('y', -radius)
        .attr('dy', -15)
        .attr('transform', d => {
          let degrees = (angleScale(d) / Math.PI) * 180
          return `rotate(${degrees})`
        })

      // holder
      //   .append('mask')
      //   .attr('id', maskId)
      //   .append('path')
      //   .datum(customDatapoints)
      //   .attr('d', line)
      //   .attr('fill', 'white')

      holder.append('text')
        .text(0)
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text("100")
        // .text(d => d * maxMinutes)

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 10).attr('font-weight', 'bold')
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxPoints)
        .attr('transform', d => {
          let degrees = (angleScale('Points') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxFieldGoals)
        .attr('transform', d => {
          let degrees = (angleScale('Field Goals') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * max3P)
        .attr('transform', d => {
          let degrees = (angleScale('3-Point Field Goals') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxFreeThrows)
        .attr('transform', d => {
          let degrees = (angleScale('Free Throws') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxRebounds)
        .attr('transform', d => {
          let degrees = (angleScale('Rebounds') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxAssists)
        .attr('transform', d => {
          let degrees = (angleScale('Assists') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxSteals)
        .attr('transform', d => {
          let degrees = (angleScale('Steals') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.selectAll('.text-label')
        .data(bands)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .attr('alignment-baseline', 'middle')
        .text(d => d * maxBlocks)
        .attr('transform', d => {
          let degrees = (angleScale('Blocks') / Math.PI) * 180
          return `rotate(${degrees})`
        })

      holder.append('text')
        .attr('font-size', 20)
        .attr('font-weight', 'bold')
        .text(player.Name)
        .attr('y', -radius)
        .attr('dy', -65)
        .attr('text-anchor', 'middle')

      holder.append('text')
        .attr('font-size', 14)
        .text(longTeamNames[player.Team])
        .attr('y', -radius)
        .attr('dy', -45)
        .attr('text-anchor', 'middle')
})
}
