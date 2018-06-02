(function() {
  var width = 1000;
  height = 500;


  var svg = d3.select("#chart")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g")
    .attr("transform", "translate(0,0)")

// defs for photos
  var defs = svg.append("defs");
  defs.append("pattern")
    .attr("id", "alex")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height", 1)
    .attr("width", 1)
    .attr("preserveAspectRatio", "none")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .attr("xlink:href", "./men_img/alex.png");



  var radiusScale = d3.scaleSqrt()
    .domain([0, 3])
    .range([20, 50])
// collection of forces about where we want our circles to go
// and how we want our circles to interact.
// STEP ONE: Get to middle.
// STEP TWO: Make them not collide. Radius should equal radius of circle.
  var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(function(d){
      return radiusScale(d.week);
    }))

  d3.queue()
    .defer(d3.csv, "bach.csv")
    .await(ready)

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
