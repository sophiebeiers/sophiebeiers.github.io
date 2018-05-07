(function() {

  var margin = { top: 20, right: 0, bottom: 50, left: 100 }

  var width = 700 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom

  var svg = d3.select("#graphic-1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.csv, "./data/female_dogs.csv")
    .defer(d3.csv, "./data/male_dogs.csv")
    // .defer(d3.csv, "./data/colors.csv")
    // .defer(d3.csv, "./data/top5breeds.csv")
    // .defer(d3.csv, "./data/guess.csv")
    .await(ready)

  // Start setting up scales
  var radiusScale_f = d3.scaleSqrt()
    .range([0, 25])

  var yPositionScale = d3.scaleBand()
    .range([0, height])
    .padding(0.5)

  function ready(error, female_dogs, male_dogs) {
    console.log(female_dogs)

    //  Setting up scales
    var girlmaxNames = d3.max(female_dogs, function(d) { return d.n })
    radiusScale_f.domain([0, girlmaxNames])


    var scalePoint = d3.scalePoint()
      .domain(['Bella', 'Princess', 'Lola', 'Lucy', 'Daisy', 'Coco', 'Molly',
      'Chloe', 'Maggie', 'Ginger'])
      .range([10, width - 10])

   // initial chart
    svg.selectAll("circle")
      .data(female_dogs)
      .enter().append("circle")
      .attr("class", "logo")
      .attr("cy", height/2)
      .attr("cx", function(d){
        return scalePoint(d.dog_name)
      })
      .attr("r", function(d){
        return radiusScale_f(d.n)
      })
      .attr("fill", "lightpink")
      .on("mouseover", function(d){
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", "red")
                  .attr('r', 30)
              d3.select('.infobox .dog_name').text(d['dog_name'])
              d3.select(".infobox").style('visibility', 'visible')


        })
         .on("mouseout", function(){
              d3.select(".infobox").style('visibility', 'hidden')
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", "lightpink")
                  .attr('r', function(d){
                    return radiusScale_f(d.n)
                  })
        });

    // scales
    var radiusScale_m = d3.scaleSqrt()
      .range([0, 25])
    var boymaxNames = d3.max(male_dogs, function(d) { return d.n })
    radiusScale_m.domain([0, boymaxNames])


    var scalePoint_m = d3.scalePoint()
      .domain(['Max', 'Rocky', 'Lucky', 'Buddy', 'Charlie', 'Jack', 'Teddy', 'Toby', 'Buster'])
      .range([10, width - 10])

    // step 1
    d3.select("#first-step")
    .on('stepin', function() {
      svg.selectAll("circle")
        .transition()
        .duration(200)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 0)

    svg.selectAll("circle")
      .data(male_dogs)
      .enter().append("circle")
      .filter(function(d) { return d.n < 291 })
      .attr("cy", height/2)
      .attr("cx", function(d){
        return scalePoint_m(d.dog_name)
      })
      .attr("r", function(d){
        return radiusScale_m(d.n)
        console.log(d.n)
      })
      .attr("fill", "lightblue")
      .on("mouseover", function(d){
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", "red")
                  .attr('r', 30)
              d3.select('.infobox .dog_name').text(d['dog_name'])
              d3.select(".infobox").style('visibility', 'visible')
        })
         .on("mouseout", function(){
              d3.select(".infobox").style('visibility', 'hidden')
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", "lightblue")
                  .attr('r', function(d){
                    return radiusScale_m(d.n)
                  })
        })
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
