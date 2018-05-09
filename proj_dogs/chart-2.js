(function() {

  var margin = { top: 20, right: 10, bottom: 50, left: 10 }

  var width = 700 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom

  var svg = d3.select("#graphic-2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.csv, "./data/top5breeds.csv")
    .await(ready)

  // Start setting up scales
  var radiusScale = d3.scaleSqrt()
    .range([0, 30])

  var yPositionScale = d3.scaleBand()
    .range([0, height])
    .padding(0.5)

  function ready(error, breeds) {
    console.log(breeds)

    //  Setting up scales
    // var malemaxNames = d3.max(male_dogs, function(d) { return d.n })
    // radiusScale.domain([0, malemaxNames])


    var scalePoint = d3.scalePoint()
      .domain(['Yorkshire Terrier', 'Shih Tzu', 'Chihuahua', 'American Pit Bull Terrier/Pit Bull', 'Maltese'])
      .range([30, width - 70])

   // initial chart
   svg.append('g').selectAll('.myPoint')
     .data(breeds)
     .enter().append('image')
     .filter(function(d) {return d.borough === "Bronx"})
     .attr("xlink:href", function(d){
       return d.img;
    })
     // .transition()
     // .duration(2000)
     .attr("x", function(d){ return scalePoint(d.breed) })
     .attr("y", function(d){ return (height/2) -10 })
     .attr("width", 70)
     .attr("height", 70)
     .on("mouseover", function(d){
       d3.select(this)
       .style("cursor", "pointer")
       .attr("width", 80)
       .attr("height", 80);
    })
      .on("mouseout", function(d){
        d3.select(this)
        .attr("width", 70)
        .attr("height", 70);
     })
    // svg.selectAll("circle")
    //   .data(names_gender)
    //   .enter().append("circle")
    //   .filter(function(d) { return d.n > 300 && d.gender === "M" })
    //   .attr("cy", height/2)
    //   .attr("cx", function(d){
    //     return scalePoint(d.dog_name)
    //   })
    //   .attr("r", function(d){
    //     return radiusScale(d.n)
    //   })
    //   .attr("fill", "#9ebcda")
    //   .on("mouseover", function(d){
    //           d3.select(this)
    //               .transition()
    //               .duration(100)
    //               .attr("fill", "#8c96c6")
    //               .attr('r', 37)
    //               .style("cursor", "pointer")
    //           d3.select('.infobox2 .dog_name').text(d['dog_name'])
    //           d3.select(".infobox2").style('visibility', 'visible')
    //     })
    //    .on("mouseout", function(d){
    //         d3.select(".infobox2").style('visibility', 'hidden')
    //         d3.select(this)
    //             .transition()
    //             .duration(100)
    //             .attr("fill", "#9ebcda")
    //             .attr('r', function(d){
    //               return radiusScale(d.n)
    //             })
    //   })

    // step 1

    // d3.select("#first-step")
    // .on('stepin', function() {
    //   svg.selectAll("circle")
    //     .transition()
    //     .duration(2000)
    //     .attr("fill", "blue")  })







  }

})()
