(function() {

  var margin = { top: 20, right: 10, bottom: 50, left: 10 }

  var width = 700 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom

  var svg = d3.select("#graphic-2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(responsivefy)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      // make svg responsive
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
  }


// data
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
 var element = document.getElementById("test")
// Tooltip
/* Initialize tooltip */
  // var tip = d3.tip()
  //   .attr('class', 'd3-tip')
  //   .offset([-10, 0])
  //   .html(function(d) {
  //     return "<span style='color:black'>" + "Breed: " +  "</span>" + "<span style='font-weight:bold'>" + d.breed + "</span>" +
  //     "<br>" + "Total dogs: " +  "<span style='font-weight:bold'>" + d.n + "</span>" + "</span>";
  //   })
  //   .style('font-size', "11px")
  //   tip.direction('s')
  // svg.call(tip)


//  Setting up scales
  var scalePoint_all = d3.scalePoint()
    .domain(['Yorkshire Terrier', 'Shih Tzu', 'Chihuahua', 'American Pit Bull Terrier/Pit Bull', 'Maltese', 'Labrador Retriever', 'Beagle', 'Spaniel'])
    .range([30, width - 70])

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
   svg.append('g').selectAll('image')
     .data(breeds)
     .enter().append('image')
     .attr("id", "test")
     .classed("All", function(d){
       return d.borough === "All"})
     .classed("Bronx", function(d){
       return d.borough === "Bronx"})
     .classed("Manhattan", function(d){
       return d.borough === "Manhattan"})
     .classed("Brooklyn", function(d){
       return d.borough === "Brooklyn"})
     .classed("Queens", function(d){
       return d.borough === "Queens"})
     .classed("Staten", function(d){
       return d.borough === "Staten Island"})
     .attr("xlink:href", function(d){
       return d.img;
    })
     .attr("x", 0)
     .attr("y", 0)
     .attr("width", 0)
     .attr("height", 0)

     .on("mouseover", function(d) {
     var tooltipData = d
     console.log(tooltipData)
     d3.select('#tooltip')
      .style("visibility","visible")
      .style('top', d3.event.pageY + 5 + 'px')
      .style('left', d3.event.pageX + 5 + 'px')
      .style("cursor", "pointer")
      .html(function(d){
        return "Breed: " + "<span style='font-weight:bold'>" + tooltipData.breed + "</span>" +
        "<br>" + "Total dogs: " +  "<span style='font-weight:bold'>" + tooltipData.n + "</span>" + "</span>";
        // Here you add the info you wanna show
        // in the tooltip, using html formatting
      })
    d3.select(this)
      .style("cursor", "pointer")
      .attr("width", 80)
      .attr("height", 80)
    })

     .on("mouseout", function(d) {
	     d3.select('#tooltip')
				.style("visibility","hidden")
				.style('top', d3.event.pageY + 5 + 'px')
				.style('left', d3.event.pageX + 5 + 'px')
       d3.select(this)
        .attr("width", 70)
        .attr("height", 70)
});



    // step 1 -- All dogs
    d3.select("#thirdish-step")
      .on('stepin', function() {
        console.log("thirdish step!")
        svg.selectAll(".Bronx")
          .attr("x", 1000)
          .attr("y", 0)
          .attr("width", 0)
          .attr("height", 0)
          .attr("opacity", 0)
        svg.selectAll(".All")
          .attr("x", function(d){ return scalePoint_all(d.breed) })
          .attr("y", function(d){ return (height/2) -10 })
          .attr("width", 70)
          .attr("height", 70)
          .attr("opacity", 1)
          .each(
            function(d) {
              if (d.breed == "Shih Tzu"||d.breed == "American Pit Bull Terrier/Pit Bull"
            ||d.breed =="Labrador Retriever"||d.breed == "Spaniel") {
                var currentY = d3.select(this).attr("y");
                var theDog = d3.select(this);
                repeat()
                function repeat() {
                  theDog = theDog.transition()
                  .duration(500)
                  .attr("y", currentY - 10)
                  .attr('height', 80)
                  .transition()
                  .duration(500)
                  .attr("y", currentY)
                  .attr('height', 70)
                  .on("end", repeat)
          }
        } else if (d.breed == "Beagle"||d.breed == "Yorkshire Terrier"){
          var currentY = d3.select(this).attr("y");
          var theDog = d3.select(this);
          repeat()
          function repeat() {
            theDog = theDog.transition()
            .duration(300)
            .attr("y", currentY - 15)
            .attr('height', 80)
            .transition()
            .duration(300)
            .attr("y", currentY)
            .attr('height', 70)
            .on("end", repeat)
          }
        }
      }
    )

    })
// Bronx dogs
    d3.select("#fourth-step")
      .on('stepin', function() {
        console.log("fourth step!")
        // svg.selectAll(".All").remove()
        svg.selectAll(".All")
          .attr("x", 1000)
          .attr("y", 0)
          .attr("width", 0)
          .attr("height", 0)
          .attr("opacity", 0)
        svg.selectAll(".Bronx")
          .attr("x", function(d){ return scalePoint(d.breed) })
          .attr("y", function(d){ return (height/2) -10 })
          .attr("width", 70)
          .attr("height", 70)
          .attr("opacity", 1)
        svg.selectAll(".Manhattan")
          .attr("x", 1000)
          .attr("y", 0)
          .attr("width", 0)
          .attr("height", 0)
          .attr("opacity", 0)
          })

    // step 2 -- Manhattan dogs
      d3.select("#fifth-step")
        .on('stepin', function() {
          console.log("fifth step!")
          svg.selectAll(".Bronx")
            .attr("x", 1000)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("opacity", 0)
          svg.selectAll(".Manhattan")
            .attr("x", function(d){ return scalePoint_m(d.breed) })
            .attr("y", function(d){ return (height/2) -10 })
            .attr("width", 70)
            .attr("height", 70)
            .attr("opacity", 1)
            // scroll up stuff
          svg.selectAll(".Brooklyn")
            .attr("x", 1000)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("opacity", 0)
            })

      d3.select("#sixth-step")
        .on('stepin', function() {
          console.log("sixth step!")
          svg.selectAll(".Manhattan")
            .attr("x", 1000)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("opacity", 0)

          // scroll back up stuff
          svg.selectAll(".Queens")
            .attr("x", 1000)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("opacity", 0)
          svg.selectAll(".Brooklyn")
            .attr("x", function(d){ return scalePoint_b(d.breed) })
            .attr("y", function(d){ return (height/2) -10 })
            .attr("width", 70)
            .attr("height", 70)
            .attr("opacity", 1)
            })


        d3.select("#seventh-step")
          .on('stepin', function() {
            console.log("seventh step!")
            svg.selectAll(".Brooklyn")
              .attr("x", 1000)
              .attr("y", 0)
              .attr("width", 0)
              .attr("height", 0)
              .attr("opacity", 0)
            svg.selectAll(".Staten")
              .attr("x", 1000)
              .attr("y", 0)
              .attr("width", 0)
              .attr("height", 0)
              .attr("opacity", 0)
            svg.selectAll(".Queens")
              .attr("x", function(d){ return scalePoint_q(d.breed) })
              .attr("y", function(d){ return (height/2) -10 })
              .attr("width", 70)
              .attr("height", 70)
              .attr("opacity", 1)

              })

        d3.select("#eighth-step")
          .on('stepin', function() {
            console.log("eighth step!")
            svg.selectAll(".Queens")
              .attr("x", 1000)
              .attr("y", 0)
              .attr("width", 0)
              .attr("height", 0)
              .attr("opacity", 0)
            svg.selectAll(".Staten")
              .attr("x", function(d){ return scalePoint_s(d.breed) })
              .attr("y", function(d){ return (height/2) -10 })
              .attr("width", 70)
              .attr("height", 70)
              .attr("opacity", 1)
              })







  }

})()
