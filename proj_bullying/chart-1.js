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


// hover over events
function findTheMouse(){
  var coordinates = d3.mouse(this);
  x.textContent = coordinates[0];
  // y.textContent = coordinates[1];
}

  var focus = svg.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("line")
          .attr("class", "x-hover-line hover-line")
          .attr("y1", 0)
          .attr("y2", height);

      focus.append("line")
          .attr("class", "y-hover-line hover-line")
          .attr("x1", width)
          .attr("x2", width);

      focus.append("circle")
          .attr("r", 7.5);

      focus.append("text")
          .attr("x", 15)
        	.attr("dy", ".31em");

      svg.append("rect")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", determineData);

        // custom invert function
        xScale.invert = (function(){
            var domain = xScale.domain()
            var range = xScale.range()
            var scale = d3.scaleQuantize().domain(range).range(domain)

            return function(x){
                return scale(x)
            }
        })()

        var bisector = d3.bisector(function(d){ return d.year; }).left;


        function determineData(d){
          // get x coordinate for the mouse
          var xCoordinate = d3.mouse(this)[0];
          // invert the scale to get the domain value
          var domainX = xScale.invert(xCoordinate);
          // bisect the data to get insertion position
          var pos = bisector(data, domainX);
          // get the closest smaller and larger values in the data array
          var smaller = data[pos-1];
          var larger = data[pos];
          // figure out which one is closer to the domain value
          var closest = domainX - smaller.xScale < larger.xScale - domainX ? smaller : larger;
          // do something with closest
        }


      // }

      // function mousemove() {
      //   var x0 = findTheMouse,
      //       // x0 = x.invert(d3.mouse(this)[0]),
      //       i = bisectDate(data, x0, 1),
      //       d0 = data[i - 1],
      //       d1 = data[i],
      //       d = x0 - d0.year > d1.year - x0 ? d1 : d0;
      //   focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
      //   focus.select("text").text(function() { return d.value; });
      //   focus.select(".x-hover-line").attr("y2", height - y(d.value));
      //   focus.select(".y-hover-line").attr("x2", width + width);
      // }

//steps
d3.select("#first-step")
    .on('stepin', function() {
      console.log("step 1")
      svg.append("path")
          .data([data.filter(function(d){return d.group == 'all';})])
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

      })
  d3.select("#second-step")
      .on('stepin', function() {
        console.log("step 1")
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
