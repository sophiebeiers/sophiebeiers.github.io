(function(){
var width = 600;
height = 300;

let margin = { top: 0, left: 50, right: 0, bottom: 40 }
let svg = d3
.select('#chart2')
.append('svg')
.attr('height', height + margin.top + margin.bottom)
.attr('width', width + margin.left + margin.right)
.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var tilesPerRow = 3;
var tileSize = 12;
var barPadding = 10;
var maxValue = 20;

var barWidth = (tilesPerRow * tileSize) + barPadding;

var data, filteredData;
let colors = ["#ffd275", "#e8ae68", "#a57f60", "#e3a587", "#e48775"];

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


function initializeData() {
  data = data.map(function(d) {
    return {
      name: d.name,
      num: +d.n
    }
  });
}

function updateFilteredData() {
    console.log(data)
    filteredData = data
filteredD = data.filter(function(d){
  return d.num > 4;
  // filteredData = data.filter(function(d) {
  //   return d.num > 4;

    console.log(filteredData)
  });
}

function updateLabel(d) {
  var el = d3.select(this)
    .select("text");

    el = d3.select("this")
      .append("text")
      .attr("y", -4)
      .attr("transform", "rotate(-90)")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .style("fill", "#777");


  el.text(d.name);
}

function getTiles(num) {
  var tiles = [];

  for(var i = 0; i < num; i++) {
    var rowNumber = Math.floor(i / tilesPerRow);
    tiles.push({
      x: (i % tilesPerRow) * tileSize,
      y: -(rowNumber + 1) * tileSize
    });
  }

  return tiles
}

function updateBar(d, i) {
  var tiles = getTiles(d.num);
  console.log(tiles)

  var u = d3.select(this)
    .attr("transform", "translate(" + i * barWidth + ", 300)")
    .selectAll("rect")
    .data(tiles);

  u.enter()
    .append("rect")
    .style("opacity", 0)
    .style("stroke", "white")
    .style("stroke-width", "0.5")
    .style("shape-rendering", "crispEdges")
    .merge(u)
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .attr("width", tileSize)
    .attr("height", tileSize)
    .transition()
    .delay(function(d, i) {
      return i * 20;
    })
    .style("opacity", 1);


  u.exit()
    .transition()
    .delay(function(d, i) {
      return (100 - i) * 20;
    })
    .style("opacity", 0)
    .on("end", function() {
      d3.select(this).remove();
    });
}

function updateBars() {
  var u = svg
    .selectAll("g")
    .data(filteredData);

  u.enter()
    .append("g")
    .merge(u)
    .style("fill", function(d, i) {
      return colors[i % colors.length];
    })
    .each(updateBar)
    // .each(updateLabel);

  u.exit().remove();
}


function update() {
  updateFilteredData();
  updateBars();
  updateLabel();
}

initializeData()
update()

}
})()
