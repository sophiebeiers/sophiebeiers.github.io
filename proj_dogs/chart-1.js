(function() {

  var margin = { top: 20, right: 20, bottom: 20, left: 15 }

  var width = 1200 - margin.left - margin.right,
      height = 120 - margin.top - margin.bottom

  var svg = d3.select("#graphic-1").append("svg")
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
      svg.attr("viewBox", "0 0 " + width  + " " + height)
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
    .defer(d3.csv, "./data/names_gender.csv")
    .await(ready)

  // Start setting up scales
  var radiusScale = d3.scaleSqrt()
    .range([0, 40])
    .domain([0, 766])

  function ready(error, names_gender) {
    console.log(names_gender)

    //  Setting up scales


    var scalePoint = d3.scalePoint()
      .domain(['1. Bella', '2. Princess', '3. Lola', '4. Lucy', '5. Daisy', '6. Coco', '7. Molly',
      '8. Chloe', '9. Maggie', '10. Ginger'])
      .range([40, width - 40])
    var scalePoint_m = d3.scalePoint()
      .domain(['1. Max', '2. Rocky', '3. Lucky', '4. Buddy', '5. Charlie', '6. Jack', '7. Teddy',
      '8. Toby', '9. Buster', '10. Gizmo'])
      .range([40, width - 40])

   // initial chart

    svg.selectAll("circle")
      .data(names_gender)
      .enter().append("circle")
      .classed("female", function(d) {
      return d.gender === 'F'&& d.n > 300
    })
      .classed("male", function(d) {
      return d.gender === 'M'&& d.n > 290
    })
      .classed("Bella", function(d) {
      return d.dog_name === "1. Bella"
    })
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("opacity", 0)
      .on("mouseover", function(d){
              console.log("hey")
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", function(d){
                    return d.gender == 'M' ? '#5f8bb7' : '#810f7c'
                  })
                  .attr('r', function(d){
                    return radiusScale(d.n) + 5
                  })
                  .style("cursor", "pointer")
              d3.select('.infobox .dog_name').text(d['dog_name']).style("color", "#810f7c").style("font-size", "20px").style("font-weight", "700")
              d3.select('.infobox1-1 .dog_name').text(d['dog_name']).style("color", "#5f8bb7").style("font-size", "20px").style("font-weight", "700")
              d3.select('.infobox1-1').style('visibility', 'visible')
              d3.select(".infobox").style('visibility', 'visible')
        })
         .on("mouseout", function(){
              d3.select(".infobox").style('visibility', 'hidden')
              d3.select('.infobox1-1').style('visibility', 'hidden')
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", function(d){
                    return d.gender == 'M' ? '#9ebcda' : "#8c6bb1"
                  })
                  .attr('r', function(d){
                    return radiusScale(d.n)
                  })

        })
        // this adds the dogs
        svg.append('g').selectAll('.myPoint')
          .data(names_gender)
          .enter().append('image')
          .classed("female_img", function(d) {
          return d.gender === 'F'&& d.n > 300
        })
          .classed("male_img", function(d) {
          return d.gender === 'M'&& d.n > 290
        })
          .classed("Bella_img", function(d) {
          return d.dog_name === "1. Bella"
        })
          .attr("x", 0)
          .attr("width", 0)
          .attr("height", 0)
          .attr("y", 0)


// zero-eth step brings in lady dogs
    d3.select("#zero-step")
        .on('stepin', function() {
            d3.select(".infobox1-1").style('visibility', 'hidden')
            console.log("back to step 0")
            svg.selectAll(".female")
                .attr("cy", height/2)
                .attr("cx", function(d){
                  return scalePoint(d.dog_name)
                })
                .attr("r", function(d){
                  return radiusScale(d.n)
                })
                .attr("fill", "#8c6bb1")
                .attr("opacity", 1)
                .attr("stroke", "#810f7c")
                .attr("stroke-width", 3)
            // the scroll up stuff
            svg.selectAll(".Bella")
                .attr("cy", height/2)
                .attr("cx", function(d){
                  return scalePoint(d.dog_name)
                })
                .attr("r", function(d){
                  return radiusScale(d.n)
                })
                .attr("fill", "#8c6bb1")
                .attr("opacity", 1)
                .attr("stroke", "#810f7c")
                .attr("stroke-width", 3)
            svg.selectAll(".male")
              .transition()
              .attr("cx", width)
              .attr("opacity", 0)
            svg.selectAll(".female_img")
                .attr("xlink:href", "dog.svg")
                .attr("x", function(d){
                  return scalePoint(d.dog_name) - 15})
                .attr("y",  function(d){ return (height/2) -8 })
                .attr("width", 30)
                .attr("height", 30)
                })



// Bella
    d3.select("#first-step")
          .on('stepin', function() {
            console.log("step 1")
            d3.select(".titlebox1").style('visibility', 'visible')
            d3.select(".infobox2").style('visibility', 'visible')
            svg.selectAll(".Bella")
               .transition()
               .duration(800)
               .attr("r", 40)
               .attr("stroke", "yellow")
           svg.selectAll(".female_img")
               .attr("xlink:href", "dog.svg")
               .attr("x", function(d){
                 return scalePoint(d.dog_name) - 15})
               .attr("y",  function(d){ return (height/2) -8 })
               .attr("width", 30)
               .attr("height", 30)
            // scroll up stuff
            svg.selectAll(".female")
              .attr("cy", height/2)
              .attr("cx", function(d){
                return scalePoint(d.dog_name)
              })
              .attr("r", function(d){
                return radiusScale(d.n)
              })
              .attr("fill", "#8c6bb1")
              .attr("opacity", 1)
              .attr("stroke", "#810f7c")
              .attr("stroke-width", 3)
            svg.selectAll(".male_img")
              .attr("x", 0)
              .attr("width", 0)
              .attr("height", 0)
              .attr("y", 0)
            svg.selectAll(".male")
              .transition()
              .attr("cx", width)
              .attr("opacity", 0)

  })


// step 2 introduces boy dogs

    d3.select("#second-step")
          .on('stepin', function() {
            console.log("step 2")
            svg.selectAll(".male")
              .attr("cy", height/2)
              .attr("cx", function(d){
                return scalePoint_m(d.dog_name)
              })
              .attr("r", function(d){
                return radiusScale(d.n)
              })
              .attr("fill", "#9ebcda")
              .attr("opacity", 1)
              .attr("stroke", "#5f8bb7")
              .attr("stroke-width", 3)
            svg.selectAll(".male_img")
                .attr("xlink:href", "dog2.svg")
                .attr("x", function(d){
                  return scalePoint_m(d.dog_name) - 15})
                .attr("y",  function(d){ return (height/2) -8 })
                .attr("width", 30)
                .attr("height", 30)
            d3.select(".infobox1-1").style('visibility', 'hidden')
            // the scroll up stuff
            svg.selectAll(".female")
              .transition()
              .duration(500)
                .attr("cx", 1000)
                .attr("cy", 0)
              .transition()
              .duration(600)
                .attr("opacity", 0)
            svg.selectAll(".female_img")
              .transition()
              .attr("x", 0)
              .attr("width", 0)
              .attr("height", 0)
              .attr("y", 0)

          })



// third step gets rid of circles

      d3.select("#third-step")
            .on('stepin', function() {
              console.log("step 3")
              d3.select(".titlebox2").style('visibility', 'hidden')
              svg.selectAll(".male")
                .transition()
                .duration(300)
                  .attr("cx", 0)
                .transition()
                .duration(200)
                  .attr("opacity", 0)
              svg.selectAll(".male_img")
              .attr("x", 0)
              .attr("width", 0)
              .attr("height", 0)
              .attr("y", 0)
            })



  }

})()
