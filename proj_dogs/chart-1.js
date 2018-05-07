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
    .defer(d3.csv, "./data/female_dogs.csv")
    // .defer(d3.csv, "./data/male_dogs.csv")
    // .defer(d3.csv, "./data/colors.csv")
    // .defer(d3.csv, "./data/top5breeds.csv")
    // .defer(d3.csv, "./data/guess.csv")
    .await(ready)

  // Start setting up scales
  var radiusScale = d3.scaleSqrt()
    .range([0, 10])

  var yPositionScale = d3.scaleBand()
    .range([0, height])
    .padding(0.5)

  function ready(error, female_dogs) {
    console.log(female_dogs)

    // Finish setting up scales
    var maxNames = d3.max(female_dogs, function(d) { return d.n })
    radiusScale.domain([0, maxNames])


    var scalePoint = d3.scalePoint()
      .domain(['Bella', 'Princess', 'Lola', 'Lucy', 'Daisy', 'Coco', 'Molly',
      'Chloe', 'Maggie', 'Ginger', 'Lady', 'Roxy', 'Sophie','Lily'])
      .range([25, 500])
    //console.log(radiusScale.domain([0, maxNames]))
    //
    // var names = female_dogs.map(function(d) { return d.dog_name })
    // yPositionScale.domain(names)
    svg.selectAll("circle")
      .data(female_dogs)
      .enter().append("circle")
      .attr("class", "logo")
      .attr("cy", height/2)
      .attr("cx", function(d){
        return scalePoint(d.dog_name)
      })
      .attr("r", function(d){
        return radiusScale(d.n)
      })
      .attr("fill", "lightpink")
      .on("mouseover", function(){
              d3.select(this)
                  .style("fill", "url(#image)");
        })
         .on("mouseout", function(){
              d3.select(this)
                  .style("fill", "transparent");
        });


    // Draw axes
    // var yAxis = d3.axisLeft(yPositionScale)
    // svg.append("g")
    //   .attr("class", "axis y-axis")
    //   .call(yAxis)
    //
    // var xAxis = d3.axisBottom(widthScale)
    // svg.append("g")
    //   .attr("class", "axis x-axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis)



    d3.select("#first-step")
      .on('stepin', function() {
        svg.selectAll("rect")
          .data(female_dogs)
          .enter().append("rect")
          .attr("x", 0)
          .attr("y", 10)
          // .attr("y", function(d) {
          //   return yPositionScale(d.n)
          // })
          //.attr("height", yPositionScale.bandwidth())
          .attr("width", 10)
          .attr("fill", 'pink')
        // svg.selectAll("rect")
        //   .transition()
        //   .duration(750)
        //   .attr("width", function(d) {
        //     return widthScale(d.population)
        //   })

        console.log("I was stepped into")
      })


    // d3.select("#second-step")
    //   .on('stepin', function() {
    //
    //     svg.selectAll("rect")
    //       .transition()
    //       .duration(750)
    //       .attr("fill", function(d) {
    //         if(d.name === "Atlantis") {
    //           return 'red'
    //         } else {
    //           return 'pink'
    //         }
    //       })
    //
    //     console.log("I was stepped into")
    //   })

    // d3.select("#third-step")
    //   .on('stepin', function() {
    //
    //     var sorted = datapoints.sort(function(a, b) {
    //       return b.population - a.population
    //     })
    //
    //     var names = sorted.map(function(d) { return d.name })
    //     yPositionScale.domain(names) /*changes scales to reflect order we just created*/
    //
    //
    //      svg.selectAll("rect")
    //       .transition()
    //       .duration(750)
    //       .attr("y", function(d) {
    //         return yPositionScale(d.name)
    //       })
    //
    //   var yAxis = d3.axisLeft(yPositionScale)
    //   svg.select(".y-axis").call(yAxis)
    //     .transition()
    //     .duration()
    //     .call(yAxis)

     // })

  }

})()
