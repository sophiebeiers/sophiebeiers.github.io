(function() {

var margin = { top: 20, right: 0, bottom: 50, left: 70 }

var width = 500 - margin.left - margin.right,
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
    .domain([.22, .35]);

// define the area
// var area = d3.area()
//     .x(function(d) { return xScale(d.year); })
//     .y(function(d) { return yScale(d.rate); });

// define the line
var valueline = d3.line()
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.rate); });
var vertline = d3.line()
    .x(function(d) { return xScale(2016); })
    .y(function(d) { return yScale(d.rate) + 60; })
var vertline2 = d3.line()
    .x(width-100)
    .y(height)

svg.append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);


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
// Area
// var area = d3.area()
//     .x(function(d) { return xScale(d.year); })
//     .y0(height)
//     .y1(function(d) { return yScale(d.rate); });
// Add text
//Add the SVG Text Element to the svgContainer
text = svg.selectAll("text")
          .data(data)
          .enter()
          .append("text");

  // add the line path for what first appears

  lineGraph = svg.append("path")
    .data([data.filter(function(d){return d.group == 'all';})])
    .transition()
    .duration(2000)
    .attr('stroke-dasharray', lineLength + ' ' + lineLength)
    // here we transition the stroke-dashoffset to simulate 'drawing' the line
    .attrTween('stroke-dashoffset', tween)
    .attr("class", "line-all")
    .attr("d", valueline)
    .attr("stroke", "#ffe700")
    .attr("stroke-opacity", 1)
  svg.selectAll(".g-line")
      .attr("stroke", "transparent")
  // svg.append("path")
  //     .attr("class", "area")
  //     .attr("fill", "yellow")
  //     .attr("d", area);

// dotted line
  svg.append("line")
    .attr("x1", xScale(2016))
    .attr("y1", 0)
    .attr("x2", xScale(2016))
    .attr("y2", height)
    .style("stroke-width", 1)
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke", "lightgrey")
    .style("fill", "none");
    //
    svg.append("line")
      .attr("x1", xScale(2017))
      .attr("y1", 0)
      .attr("x2", xScale(2017))
      .attr("y2", height)
      .style("stroke-width", 1)
      .style("stroke-dasharray", ("3, 3"))
      .style("stroke", "lightgrey")
      .style("fill", "none");




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
      .attr("class", "axisWhite")
      .call(d3.axisBottom(xScale)
      .tickSize(0)
      .tickPadding(20))



// Y Axis
  // var formatPercent = d3.format(".0%");
  // svg.append("g")
  //     .attr("class", "axisWhiteY")
  //     .call(d3.axisLeft(yScale)
  //       .tickFormat(formatPercent)
  //       .tickPadding(10)
  //       .ticks(6)
  //       .tickSize(0))



// filtering
var all = data.filter(function(d){return d.group == 'all'})
var girls = data.filter(function(d){return d.group == 'girls'})
var boys = data.filter(function(d){return d.group == 'boys'})

// svg.append("path")
//   .datum(girls)
//   .attr("fill", "steelblue")
//   .attr("d", area);
//steps


d3.select("#first-step")
    .on('stepin', function() {
      console.log("step 1")
      svg.append("g")
          .data([data.filter(function(d){return d.group == 'all'})])
      svg.selectAll(".line-all")
          .attr("stroke", "#ffe700")
      // get rid of girls on scroll up
      svg.selectAll(".before-rect")
         .attr("opacity", 0)
      svg.selectAll(".girl-text")
          .attr("fill", "transparent")
      svg.selectAll(".g-line")
          .attr("stroke", "transparent")
      svg.selectAll(".circle-g")
          .attr("fill", "transparent")

        })
        // end of step 1

// before
  d3.select("#second-step")
      .on('stepin', function() {
        console.log("step 2")
            // rect
        svg.append('rect')
             .attr("x", function(d) {return xScale(2014)})
             .attr("class", 'before-rect')
             .attr("y", 0)
             .attr("width", width - 150)
             .attr("height", height)
             .attr("fill", "#99bdf7")
             .attr("opacity", 0.2)
        // scroll up stuff
        svg.selectAll('.after-rect')
            .attr("opacity", 0)
        svg.selectAll(".b-line")
            .attr("stroke", "transparent")
        svg.selectAll(".circle-b")
            .attr("fill", "transparent")
        // fade other lines
        // svg.selectAll(".line-all")
        //    .attr("stroke", "lightgrey")
        //    .attr("stroke-opacity", 0.5)
       svg.selectAll(".circle-all")
          .attr("stroke", "lightgrey")
          .attr("fill", "lightgrey")

        })

// after 2016
  d3.select("#third-step")
      .on('stepin', function() {
        console.log("step 2")
            // rect
        svg.append('rect')
             .attr("x", function(d) {return xScale(2016)})
             .attr("class", "after-rect")
             .attr("y", 0)
             .attr("width", 138)
             .attr("height", height)
             .attr("fill", "#99bdf7")
             .attr("opacity", 0.2)
        svg.selectAll('.before-rect')
            .attr("opacity", 0)
        // scroll up stuff
        svg.selectAll(".b-line")
            .attr("stroke", "transparent")
        svg.selectAll(".circle-b")
            .attr("fill", "transparent")
        // fade other lines
        // svg.selectAll(".line-all")
        //    .attr("stroke", "lightgrey")
        //    .attr("stroke-opacity", 0.5)
        svg.selectAll(".circle-all")
          .attr("stroke", "lightgrey")
          .attr("fill", "lightgrey")

        })

// girls
    d3.select("#fourth-step")
        .on('stepin', function() {
          console.log("step 3")
          svg.append("path")
              .data([data.filter(function(d){return d.group == 'girls'})])
              .transition()
              .duration(2000)
              .attr('stroke-dasharray', lineLength + ' ' + lineLength)
              // here we transition the stroke-dashoffset to simulate 'drawing' the line
              .attrTween('stroke-dashoffset', tween)
              .attr("class", "g-line")
              .attr("d", valueline)
              .attr("stroke", "#f000ff")
              .attr("stroke-opacity", 1)
          // scroll up stuff
          svg.selectAll(".b-line")
              .attr("stroke", "transparent")
          svg.selectAll(".circle-b")
              .attr("fill", "transparent")
          // fade other lines
          svg.selectAll(".line-all")
             .attr("stroke", "lightgrey")
             .attr("stroke-opacity", 0.5)
         svg.selectAll(".circle-all")
            .attr("stroke", "lightgrey")
            .attr("fill", "lightgrey")
        // text
        text.attr("x", function(d) { return xScale(2014) - 50 })
             .attr("y", function(d) { return 132 })
             .text("GIRLS")
             .attr("class", "girl-text")
             .attr("font-weight", "normal")
             .attr("font-size", "13px")
             .attr("fill", "white")
             .attr("stroke-width", 0);
          // add circles
          svg.selectAll("circle-g")
            .data(girls)
            .enter().append("circle")
            .attr("class", "circle-g")
            .attr("cx", function(d){
              return xScale(d.year)
            })

            .attr("cy", function(d){
              return yScale(d.rate)
            })
            .attr("r", 4.5)
            .attr("fill", "#f000ff")
            .on("mouseover", function(d){
                    console.log("hey")
                    var tooltipData = d
                    d3.select('#tooltip-b')
                     .style("visibility","visible")
                     .style('top', d3.event.pageY + 5 + 'px')
                     .style('left', d3.event.pageX + 5 + 'px')
                     .style("cursor", "pointer")
                     .html(function(d){
                       return "<span style='font-weight:bold;color:black;font-size:13px'>" + (d3.format(".00%")(tooltipData.rate)) + "</span>" +
                       " of middle and high school " + "<br>" + "<span style='font-weight:bold'>" + tooltipData.group + "</span>" +
                       " were bullied in " + "<span style='font-weight:bold'>" + tooltipData.year + "</span>";
                       // Here you add the info you wanna show
                       // in the tooltip, using html formatting
                     })
                    d3.select(this)
                      .style("cursor", "pointer")
                      .attr("fill", "white")
                      .attr("r", 6)
                      })
            .on("mouseout", function(d){
                    console.log("out")
                    d3.select('#tooltip-b')
               				.style("visibility","hidden")
               				.style('top', d3.event.pageY + 5 + 'px')
               				.style('left', d3.event.pageX + 5 + 'px')
                    d3.select(this)
                      .style("cursor", "pointer")
                      .attr("fill", "#f000ff")
                      .attr("r", 4.5)
                      })


          })


// boys step
  d3.select("#fifth-step")
      .on('stepin', function() {
        console.log("step 2")
        svg.append("path")
            .data([data.filter(function(d){return d.group == 'boys'})])
            .transition()
            .duration(2000)
            .attr('stroke-dasharray', lineLength + ' ' + lineLength)
            // here we transition the stroke-dashoffset to simulate 'drawing' the line
            .attrTween('stroke-dashoffset', tween)
            .attr("class", "b-line")
            .attr("d", valueline)
            .attr("stroke", "#4deeea")
            .attr("stroke-opacity", 1)
            // add text
          text.attr("x", function(d) { return xScale(2014) - 50 })
             .attr("y", function(d) { return 230 })
             .attr("class", "boy-text")
             .text("BOYS")
             // .text( function (d) { return "( " + d.cx + ", " + d.cy +" )"; })
             .attr("font-family", "sans-serif")
             .attr("font-size", "13px")
             .attr("stroke-width", 0)
             .attr("fill", "white")
        svg.selectAll(".g-line")
           .attr("stroke", "lightgrey")
           .attr("stroke-opacity", 0.5)
        svg.selectAll(".circle-g")
           .attr("fill", "lightgrey")
           .attr("opacity", 0.5)
        svg.selectAll(".circle-b")
          .data(boys)
          .enter().append("circle")
          .attr("cx", function(d){
            return xScale(d.year)
          })

          .attr("cy", function(d){
            return yScale(d.rate)
          })
          .attr("r", 4.5)
          .attr("fill", "#4deeea")
          .attr("class", "circle-b")
          .on("mouseover", function(d){
            var tooltipData = d
            console.log(tooltipData)
                d3.select('#tooltip-b')
                 .style("visibility","visible")
                 .style('top', d3.event.pageY + 5 + 'px')
                 .style('left', d3.event.pageX + 5 + 'px')
                 .style("cursor", "pointer")
                 .html(function(d){
                   return "<span style='font-weight:bold;color:black;font-size:13px'>" + (d3.format(".00%")(tooltipData.rate)) + "</span>" +
                   " of middle and high school " + "<br>" + "<span style='font-weight:bold'>" + tooltipData.group + "</span>" +
                   " were bullied in " + "<span style='font-weight:bold;'>" + tooltipData.year + "</span>";
                   // Here you add the info you wanna show
                   // in the tooltip, using html formatting
                 })
                  console.log("hey")
                  d3.select(this)
                    .style("cursor", "pointer")
                    .attr("fill", "white")
                    .attr("r", 6)
                    })
          .on("mouseout", function(d){
                  console.log("out")
                  d3.select('#tooltip-b')
             				.style("visibility","hidden")
             				.style('top', d3.event.pageY + 5 + 'px')
             				.style('left', d3.event.pageX + 5 + 'px')
                  d3.select(this)
                    .style("cursor", "pointer")
                    .attr("fill", "#4deeea")
                    .attr("r", 4.5)
                    })
        })


}



})()
