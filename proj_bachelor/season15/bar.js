(function(){
var width = 800;
height = 500;

let margin = { top: 0, left: 50, right: 0, bottom: 40 }
let svg = d3
.select('#chart2')
.append('svg')
.attr('height', height + margin.top + margin.bottom)
.attr('width', width + margin.left + margin.right)
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// data
Promise.all([
  d3.csv('top10_names.csv'),
])
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready([
  data
]) {


var xScale = d3
.scaleBand()
.range([0, width])
.paddingInner(0.05)
.domain(data.map(function(d) { return d.name; }))

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale).ticks(15).tickSize(0))
  .selectAll("text")
    .attr("class", "x-axis-text")
    .style("text-anchor", "middle");


var yScale = d3
.scaleLinear()
.range([height - 20, 0])
.domain([0, 15]);

svg
.selectAll('rect')
.data(data)
.enter()
.append('rect')
.attr('class', "test")
.attr('x', function(d){return xScale(d.name)})
.attr('y', function(d){return yScale(d.n)})
.attr("width", xScale.bandwidth())
.attr('height', function(d) { return height - yScale(d.n); })
.attr('fill', '#c21e56')
.attr('data-tippy-content', d => `<div style="text-align: left; font-family: 'Roboto Mono', monospace;">
				<b>Name:</b> ${'&nbsp;'.repeat(1)}${d.name}<br>
				<b>Popularity:</b> ${'&nbsp;'.repeat(1)}${d.n}<br>
			</div>`)
.on('mouseover', function(d){
  d3.select(this).attr('opacity', 0.8)
})
.on('mouseout', function(d){
  d3.select(this).attr('opacity', 1)
})
.attr('opacity', 0)





tippy('svg rect', {
  arrow: true,
  size: 'large',
  animation: 'scale',
})

// steps


d3.select('#one2').on('stepin', () => {
  console.log("hey")

    svg
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('opacity', 1)


    })




} // end of data




})()
