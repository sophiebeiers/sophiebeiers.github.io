(function() {

  var margin = { top: 20, right: 20, bottom: 20, left: 15 }

  var width = 800 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom

  var svg = d3.select("#graphic-1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.csv, "./data/names_gender.csv")
    .await(ready)

  // Start setting up scales
  var radiusScale = d3.scaleSqrt()
    .range([0, 32])
    .domain([0, 766])

  function ready(error, names_gender) {
    console.log(names_gender)

    //  Setting up scales


    var scalePoint = d3.scalePoint()
      .domain(['Bella', 'Princess', 'Lola', 'Lucy', 'Daisy', 'Coco', 'Molly',
      'Chloe', 'Maggie', 'Ginger'])
      .range([40, width - 40])
    var scalePoint_m = d3.scalePoint()
      .domain(['Max', 'Rocky', 'Lucky', 'Buddy', 'Charlie', 'Jack', 'Teddy',
      'Toby', 'Buster', 'Gizmo'])
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
      return d.dog_name === "Bella"
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
              d3.select('.infobox .dog_name').text(d['dog_name'])
              d3.select('.infobox1-1 .dog_name').text(d['dog_name'])
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
          return d.dog_name === "Bella"
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
