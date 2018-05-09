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

// Tooltip
/* Initialize tooltip */
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='color:white'>" + "Breed: " +  "</span>" + "<span style='font-weight:bold'>" + d.breed + "</span>" +
    "<br>" + "Total dogs: " +  "<span style='font-weight:bold'>" + d.n + "</span>" + "</span>";
  })
  .style('font-size', "11px")
  console.log(tip)
svg.call(tip)


//  Setting up scales


// Bronx
    var scalePoint = d3.scalePoint()
      .domain(['Yorkshire Terrier', 'Shih Tzu', 'Chihuahua', 'American Pit Bull Terrier/Pit Bull', 'Maltese'])
      .range([30, width - 70])
// Manhattan
    var scalePoint_m = d3.scalePoint()
      .domain(['Yorkshire Terrier', 'Shih Tzu', 'Chihuahua', 'Labrador Retriever', 'Maltese'])
      .range([30, width - 70])
// Brooklyn
    var scalePoint_b = d3.scalePoint()
      .domain([ 'Shih Tzu', 'Yorkshire Terrier', 'Chihuahua', 'Maltese', 'American Pit Bull Terrier/Pit Bull'])
      .range([30, width - 70])
// Queens
    var scalePoint_q = d3.scalePoint()
      .domain([ 'Yorkshire Terrier', 'Shih Tzu', 'Maltese', 'Chihuahua', 'Labrador Retriever'])
      .range([30, width - 70])
// Staten Island
    var scalePoint_s = d3.scalePoint()
      .domain([ 'Yorkshire Terrier', 'Shih Tzu', 'Labrador Retriever', 'Maltese', 'Chihuahua'])
      .range([30, width - 70])


   // initial chart
   svg.append('g').selectAll('.myPoint')
     .data(breeds)
     .enter().append('image')
     .filter(function(d) {return d.borough === "Bronx"})
     .attr("xlink:href", function(d){
       return d.img;
    })
     .attr("x", function(d){ return scalePoint(d.breed) })
     .attr("y", function(d){ return (height/2) -10 })
     .attr("width", 70)
     .attr("height", 70)
     .on("mouseover", function(d){
       d3.select(this)
       .style("cursor", "pointer")
       .attr("width", 80)
       .attr("height", 80)
       tip.show(d);
    })
      .on("mouseout", function(d){
        d3.select(this)
        .attr("width", 70)
        .attr("height", 70)
        tip.hide(d);
     })


    // step 1 -- Manhattan dogs

    d3.select("#fourth-step")
      .on('stepin', function() {
        console.log("step1!")
        svg.selectAll("image").remove()
        svg.append('g').selectAll('.myPoint')
          .data(breeds)
          .enter().append('image')
          .filter(function(d) {return d.borough === "Manhattan"})
          .attr("class", "manhattandogs")
          .attr("xlink:href", function(d){
            return d.img;
            })
          .attr("x", function(d){ return scalePoint_m(d.breed) })
          .attr("y", function(d){ return (height/2) -10 })
          .attr("width", 70)
          .attr("height", 70)
          })
         //  svg.selectAll('image') // trying to get tooltip to work
         //  .on("mouseover", function(d){
         //    d3.select(this)
         //    .style("cursor", "pointer")
         //    .attr("width", 80)
         //    .attr("height", 80)
         //    tip.show(d);
         // })


      d3.select("#fifth-step")
        .on('stepin', function() {
          console.log("step5!")
          svg.selectAll("image").remove()
          svg.append('g').selectAll('.myPoint')
            .data(breeds)
            .enter().append('image')
            .filter(function(d) {return d.borough === "Brooklyn"})
            // .transition()
            // .duration(2000)
            .attr("xlink:href", function(d){
              return d.img;
              })
            .attr("x", function(d){ return scalePoint_b(d.breed) })
            .attr("y", function(d){ return (height/2) -10 })
            .attr("width", 70)
            .attr("height", 70)
            })

        d3.select("#sixth-step")
          .on('stepin', function() {
            console.log("step6!")
            svg.selectAll("image").remove()
            svg.append('g').selectAll('.myPoint')
              .data(breeds)
              .enter().append('image')
              .filter(function(d) {return d.borough === "Queens"})
              // .transition()
              // .duration(2000)
              .attr("xlink:href", function(d){
                return d.img;
                })
              .attr("x", function(d){ return scalePoint_q(d.breed) })
              .attr("y", function(d){ return (height/2) -10 })
              .attr("width", 70)
              .attr("height", 70)
              })

          d3.select("#seventh-step")
            .on('stepin', function() {
              console.log("step7!")
              svg.selectAll("image").remove()
              svg.append('g').selectAll('.myPoint')
                .data(breeds)
                .enter().append('image')
                .filter(function(d) {return d.borough === "Staten Island"})
                // .transition()
                // .duration(2000)
                .attr("xlink:href", function(d){
                  return d.img;
                  })
                .attr("x", function(d){ return scalePoint_s(d.breed) })
                .attr("y", function(d){ return (height/2) -10 })
                .attr("width", 70)
                .attr("height", 70)
                })







  }

})()
