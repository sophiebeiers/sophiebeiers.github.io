(function(){
var width = 550;
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

// force


var forceXbar = d3
  .forceX(function(d){
    return xScale(d.name_group) + 10
  })
    .strength(1)

var forceYbar = d3
  .forceY(function(d){
    return yScale(d.row) - 5
  })
    .strength(2)

var simulation = d3
  .forceSimulation()
  .force('x', forceXCombine)
  .force('y', d3.forceY(height / 2).strength(0.06))
  .force('collide', forceCollide)
  .force('charge', d3.forceManyBody().strength(-20))

var forceXSeparate = d3
  .forceX(function(d) {
    if (d.season === '1') {
      return 100
    } else if (d.season === '2') {
      return 100
    } else if (d.season === '3') {
      return 200
    } else if (d.season === '4') {
      return 200
    } else if (d.season === '5') {
      return 300
    } else if (d.season === '6') {
      return 300
    } else {
      return 400
    }
  })
  .strength(0.2)

var forceYSeparate = d3
  .forceY(function(d) {
    if (d.domain === '1') {
      return 450
    } else if (d.season === '2') {
      return 250
    } else if (d.season === '3') {
      return 450
    } else if (d.season === '4') {
      return 250
    } else if (d.season === '5') {
      return 250
    } else if (d.season === '6') {
      return 600
    } else {
      return 450
    }
  })
  .strength(0.2)

var forceXCombine = d3.forceX(width / 2.5).strength(0.05)
var forceYCombine = d3.forceY(height / 3).strength(0.05)

var forceCollide = d3.forceCollide(function(d) {
  return 5
})




// regular things
var xScale = d3
.scaleBand()
.range([0, width])
.paddingInner(0.05)
.domain(data.map(function(d) { return d.name_group; }))

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale).ticks(15).tickSize(0))
  .call(g => g.select(".domain").remove())
  .selectAll("text")
    .attr("class", "x-axis-text")
    .style("text-anchor", "middle");


var yScale = d3
.scaleLinear()
.range([height - 30, 0])
.domain([1, 15]);


data.forEach(function(d) {
        d.name = d.name
        d.n = +d.n;
    });


icons = svg
.selectAll('.icon')
.data(data)
.enter()
.append('svg:image')
    .attr("xlink:href", "./rose-02.svg")
    .attr("width", 30)
    .attr("height", 30)
    .attr("x", 0)
    .attr("y",function(d){return yScale(d.row) - 5})
    .attr("class", "icon")
    .attr('opacity', 0)

.attr('data-tippy-content', d => `<div style="text-align: left; font-family: 'Roboto Mono', monospace;">
				<b>Name:</b> ${'&nbsp;'.repeat(1)}${d.name}<br>
        <b>Season:</b> ${'&nbsp;'.repeat(1)}${d.season}<br>
				<b>How many:</b>${'&nbsp;'.repeat(1)}${d.tot} <br>
			</div>`)
.on('mouseover', function(d){
  d3.select(this).attr('opacity', 0.8)
})
.on('mouseout', function(d){
  d3.select(this).attr('opacity', 1)
})





tippy('svg image', {
  arrow: true,
  size: 'large',
  animation: 'scale',
})

// steps


d3.select('#one2').on('stepin', () => {
  console.log("hey")
svg
.selectAll('.icon')
.attr('opacity', 1)


simulation
  .force('collide', forceCollide)
  .force('x', forceXbar)
  .force('y', forceYbar)
  .alphaTarget(1)
  .force('charge', d3.forceManyBody().strength(-20))

    })


d3.select('#two2').on('stepin', () => {
  console.log("hey")

    // svg
    //   .selectAll('.icon')


    simulation
      .force('x', forceXSeparate)
      .force('y', forceYSeparate)
      .alphaTarget(1)
      // .restart()
    })

simulation.nodes(data).on('tick', ticked)
  function ticked() {
    icons.attr('x', d => d.x).attr('y', d => d.y)
  }








} // end of data




})()
