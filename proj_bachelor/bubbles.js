(function() {
  var width = 1200;
  height = 900;


  var svg = d3.select("#chart")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)")

// defs for photos
  var defs = svg.append("defs");

  var radiusScale = d3.scaleSqrt()
    .domain([0, 3])
    .range([20, 50])
// collection of forces about where we want our circles to go
// and how we want our circles to interact.
// STEP ONE: Get to middle.
// STEP TWO: Make them not collide. Radius should equal radius of circle.
  var forceXAll = d3.forceX(width/2).strength(0.05)

  var forceXOne = d3.forceX(function(d){
   if(d.week == 1) {
     return 300
   } else {
     return 900
   }
 }).strength(0.1)

 var forceXTwo = d3.forceX(function(d){
  if(d.week > 1) {
    return 900
  } else {
    return 250
  }
}).strength(0.05)

  var forceCollide = d3.forceCollide(function(d){
    return radiusScale(d.week) + 4;
  })

  var simulation = d3.forceSimulation()
    .force("x", forceXAll)
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", forceCollide)

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:white'>"  + "Name: " +  "</span>" +
      "<span style='font-weight:bold'>" + d.name + "</span>" + "<br>" +
      "Age: " +  "</span>" + "<span style='font-weight:bold'>" + d.age + "</span>" +
      "<br>" + "Occupation: " +  "<span style='font-weight:bold'>" +
      d.job + "</span>" + "</span>";
    })
    .style('font-size', "50px")
    console.log(tip)

  svg.call(tip)




  d3.queue()
    .defer(d3.csv, "bach.csv")
    .await(ready)

// do stuff down here
  function ready (error, datapoints) {
    var circles = svg.selectAll(".men")
      .data(datapoints)
      .enter().append('circle')
      .attr("class", "men")
      .attr("r", function(d){
        return radiusScale(d.week)
      })
      .attr("fill", function(d){
        return "url(#" + d.id + ")"
      })
      .on("mouseover", function(d){
        d3.select(this)
        .attr("r", 60)
        .style("cursor", "pointer")
        tip.show(d)

     })
     .on("mouseout", function(d){
       d3.select(this)
       .attr("r", function(d){
         return radiusScale(d.week);
       })
       .style("cursor", "pointer")
       tip.hide(d)
    })

    // selecting buttons
    d3.select("#all").on('click', function(){
      d3.selectAll("circle").attr("opacity", 1)
      simulation
        .force("x", forceXAll)
        .alphaTarget(0.5)
        .restart()
    })

    d3.select("#one")
    .on('click', function(){
      simulation
       .force("x", forceXOne).alphaTarget(0.5).restart()
      d3.selectAll("circle").attr("opacity", function(d){
        if(d.week == 1){
          return 0.5
        } else {
          return 1
        }
      })
    })

    d3.select("#two")
    .on('click', function(){
      simulation
       .force("x", forceXTwo).alphaTarget(0.5).restart()
      d3.selectAll("circle").attr("opacity", function(d){
        if(d.week > 1){
          return 1
        } else {
          return 0.5
        }
      })
    })

    defs.selectAll(".men-pattern")
    .data(datapoints)
    .enter().append("pattern")
    .attr("class", "men-pattern")
    .attr("id", function(d){
      return d.id
    })
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", function(d){
      return d.image_path
    });

    simulation.nodes(datapoints)
      .on("tick", ticked)

    function ticked() {
      circles
        .attr("cx", function(d) {
          return d.x
        })
        .attr("cy", function(d) {
          return d.y
        })
    }
  }

})();
