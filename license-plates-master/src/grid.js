import * as d3 from 'd3'

let margin = { top: 0, left: 20, right: 20, bottom: 0 }

let height = 700 - margin.top - margin.bottom
let width = 700 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

Promise.all([
  d3.csv(require('./data/rejected-plates.csv')),
])
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready([
  data
]) {


var row = 0;

svg
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('fill', '#FA0DE5')
	  .attr("cx", function(d, i){ return ((i%7 + 10) * (10)) - 1;})
		.attr("cy", function(d, i){ if(i%7 == 0){row++}; return row * (10);}) }
