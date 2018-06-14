(function() {

var margin = { top: 20, right: 0, bottom: 50, left: 70 }

var width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom

var svg = d3.select("#graphic-1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var formatYear = d3.timeFormat("%Y");

  // set the ranges
  // scale the range of the data
  var xScale = d3.scalePoint()
    .range([0, width - 15])
    .domain([2014, 2015, 2016, 2017])
  var yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([.2, .35]);

// define the area
// var area = d3.area()
//     .xScale(function(d) { return x(d.year); })
//     .y0(height)
//     .y1(function(d) { return y(d.rate); });

// define the line
var valueline = d3.line()
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.rate); });

//-------------------------//
// DATA
d3.queue()
  .defer(d3.csv, "bully.csv")
  .await(ready)

function ready(error, data) {
  console.log(data)

// defining variables
  var years = data.map(function(d){
    return d.year
  })

  // format the data
  data.forEach(function(d) {
      d.date = formatYear(d.year);
      d.rate = +d.rate;
  });


  // add the line path.
  lineGraph = svg.append("path")
      .data([data.filter(function(d){return d.group == 'all';})])
      .attr("class", "line-all")
      .attr("d", valueline)
      .attr("stroke", "transparent")
      svg.selectAll(".g-line")
          .attr("stroke", "transparent")

    // get total length of path
    var lineLength = lineGraph.node().getTotalLength();

// the animation
    function tween() {
      // get values between lineLength and 0
      var interpolate = d3.interpolate(lineLength, 0);
      return function(t) {
        return interpolate(t);
      };
    }

// x axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

// Y Axis
  var formatPercent = d3.format(".0%");
  svg.append("g")
      .call(d3.axisLeft(yScale)
        .tickFormat(formatPercent)
        .ticks(5))

var all = data.filter(function(d){return d.group == 'all'})

//steps
d3.select("#first-step")
    .on('stepin', function() {
      console.log("step 1")
      svg.append("g")
          .data([data.filter(function(d){return d.group == 'all'})])
      svg.selectAll(".line-all")
          .transition()
          .duration(4000)
          .attr('stroke-dasharray', lineLength + ' ' + lineLength)
          // here we transition the stroke-dashoffset to simulate 'drawing' the line
          .attrTween('stroke-dashoffset', tween)
          .attr("class", "line-all")
          .attr("d", valueline)
          .attr("stroke", "#ffe700")

      svg.selectAll(".g-line")
          .attr("stroke", "transparent")
      // circles
      svg.selectAll("circle")
        .data(all)
        .enter().append("circle")
        .attr("class", "circle-all")
        .attr("cx", function(d){
          return xScale(d.year)
        })

        .attr("cy", function(d){
          return yScale(d.rate)
        })
        .attr("r", 7.5)
        .attr("stroke", "transparent")
          .transition()
          .duration(4000)
          .attr("stroke", "white")
          .attr("fill", "transparent")
      // mouseover events   
      svg.selectAll(".circle-all")
        .on("mouseover", function(d){
                console.log("hey")
                d3.select(this)
                  .style("cursor", "pointer")
                  .attr("fill", "white")
                  .attr("r", 9)
                  })
        .on("mouseout", function(d){
                console.log("out")
                d3.select(this)
                  .style("cursor", "pointer")
                  .attr("fill", "transparent")
                  .attr("r", 7.5)
                  })
        })
        // end of step 1


  d3.select("#second-step")
      .on('stepin', function() {
        console.log("step 2")
        svg.append("path")
            .data([data.filter(function(d){return d.group == 'girls';})])
            .transition()
            .duration(2000)
            .attr('stroke-dasharray', lineLength + ' ' + lineLength)
            // here we transition the stroke-dashoffset to simulate 'drawing' the line
            .attrTween('stroke-dashoffset', tween)
            .attr("class", "g-line")
            .attr("d", valueline)
            .attr("stroke", "#f000ff")
            svg.selectAll(".b-line")
                .attr("stroke", "transparent")
        })

  d3.select("#third-step")
      .on('stepin', function() {
        console.log("step 2")
        svg.append("path")
            .data([data.filter(function(d){return d.group == 'boys';})])
            .transition()
            .duration(2000)
            .attr('stroke-dasharray', lineLength + ' ' + lineLength)
            // here we transition the stroke-dashoffset to simulate 'drawing' the line
            .attrTween('stroke-dashoffset', tween)
            .attr("class", "b-line")
            .attr("d", valueline)
            .attr("stroke", "#4deeea")
        })

    // svg.append("line")
    //       .attr(
    //       {
    //           "class":"horizontalGrid",
    //           "x1" : 0,
    //           "x2" : width,
    //           "y1" : y(0),
    //           "y2" : y(0),
    //           "fill" : "none",
    //           "shape-rendering" : "crispEdges",
    //           "stroke" : "black",
    //           "stroke-width" : "1px",
    //           "stroke-dasharray": ("3, 3")
    //       });





}



})()
