(function() {

  var margin = { top: 20, right: 0, bottom: 50, left: 100 }

  var width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom

  var svg = d3.select("#graphic-1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.csv, "basics.csv")
    .await(ready)

  // Start setting up scales
  var widthScale = d3.scaleLinear()
    .range([0, width])

  var yPositionScale = d3.scaleBand()
    .range([0, height])
    .padding(0.5)

  function ready(error, datapoints) {

    // Finish setting up scales
    var maxPop = d3.max(datapoints, function(d) { return d.population })
    widthScale.domain([0, maxPop])

    var names = datapoints.map(function(d) { return d.name })
    yPositionScale.domain(names)

    svg.selectAll("rect")
      .data(datapoints)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", function(d) {
        return yPositionScale(d.name)
      })
      .attr("height", yPositionScale.bandwidth())
      .attr("width", 10)
      .attr("fill", 'pink')

    // Draw axes
    var yAxis = d3.axisLeft(yPositionScale)
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)

    var xAxis = d3.axisBottom(widthScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)



    d3.select("#first-step")
      .on('stepin', function() {

        svg.selectAll("rect")
          .transition()
          .duration(750)
          .attr("width", function(d) {
            return widthScale(d.population)
          })

        console.log("I was stepped into")
      })


    d3.select("#second-step")
      .on('stepin', function() {

        svg.selectAll("rect")
          .transition()
          .duration(750)
          .attr("fill", function(d) {
            if(d.name === "Atlantis") {
              return 'red'
            } else {
              return 'pink'
            }
          })

        console.log("I was stepped into")
      })

    d3.select("#third-step")
      .on('stepin', function() {

        var sorted = datapoints.sort(function(a, b) {
          return b.population - a.population
        })

        var names = sorted.map(function(d) { return d.name })
        yPositionScale.domain(names) /*changes scales to reflect order we just created*/


         svg.selectAll("rect")
          .transition()
          .duration(750)
          .attr("y", function(d) {
            return yPositionScale(d.name)
          })

      var yAxis = d3.axisLeft(yPositionScale)
      svg.select(".y-axis").call(yAxis)
        .transition()
        .duration()
        .call(yAxis)

    })

  }

})()
