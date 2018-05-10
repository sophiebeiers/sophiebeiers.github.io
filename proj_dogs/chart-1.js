(function() {

  var margin = { top: 20, right: 10, bottom: 50, left: 10 }

  var width = 700 - margin.left - margin.right,
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
    .range([0, 30])
    .domain([0, 900])

  function ready(error, names_gender) {
    console.log(names_gender)

    //  Setting up scales
    // var girlmaxNames = d3.max(names_gender, function(d) { filter(d.gender === "F"), return d.n })
    // radiusScale.domain([0, girlmaxNames])


    var scalePoint = d3.scalePoint()
      .domain(['Bella', 'Princess', 'Lola', 'Lucy', 'Daisy', 'Coco', 'Molly',
      'Chloe', 'Maggie', 'Ginger'])
      .range([20, width - 20])
    var scalePoint_m = d3.scalePoint()
      .domain(['Max', 'Rocky', 'Lucky', 'Buddy', 'Charlie', 'Jack', 'Teddy',
      'Toby', 'Buster', 'Gizmo'])
      .range([20, width - 20])

   // initial chart

    svg.selectAll("circle")
      .data(names_gender)
      .enter().append("circle")
      .filter(function(d) {return d.n > 300 && d.gender === "F"})
      .attr("cy", height/2)
      .attr("class", "yay")
      .attr("cx", function(d){
        return scalePoint(d.dog_name)
      })
      .attr("r", function(d){
        return radiusScale(d.n)
      })
      .attr("fill", "#8c6bb1")
      .on("mouseover", function(d){
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", "#810f7c")
                  .attr('r', function(d){
                    return radiusScale(d.n) + 5
                  })
                  .style("cursor", "pointer")

              d3.select('.infobox .dog_name').text(d['dog_name'])
              d3.select(".infobox").style('visibility', 'visible')
        })
         .on("mouseout", function(){
              d3.select(".infobox").style('visibility', 'hidden')
              d3.select(this)
                  .transition()
                  .duration(100)
                  .attr("fill", "#8c6bb1")
                  .attr('r', function(d){
                    return radiusScale(d.n)
                  })
        })
        // this adds the dogs
        svg.append('g').selectAll('.myPoint')
          .data(names_gender)
          .enter().append('image')
          .filter(function(d) {return d.n > 300 && d.gender === "F"})
          .attr("xlink:href", "dog.svg")
          .attr("x", function(d){ return scalePoint(d.dog_name) - 18 })
          .attr("y", function(d){ return (height/2) -10 })
          .attr("width", 35)
          .attr("height", function(d){
            return radiusScale(d.n) + 5
          })



// first step zooms in on Bella
    d3.select("#first-step")
          .on('stepin', function() {
            d3.select(".titlebox1").style('visibility', 'visible')
            d3.select(".infobox2").style('visibility', 'visible')
            svg.selectAll("image").remove()
            svg.selectAll("circle")
              .attr("class", "Bella")
              .transition()
              .duration(2000)
              .attr("fill", function(d){
                if(d.dog_name === "Bella"){
                  return '#810f7c'

                } else {
                  return 'lightgrey'
                }
                })
              .attr("r", function(d){
                if(d.dog_name === "Bella"){
                  return 50

                } else {
                  return 0
                }
                })
              .attr("cx", function(d){
                if(d.dog_name === "Bella"){
                  return width/2

                } else {
                  return 0
                }

                })
              .attr("cy", 30)
              // adds dog face
              svg.append('g').selectAll('.myPoint')
                .data(names_gender)
                .enter().append('image')
                .filter(function(d) {return d.dog_name === "Bella"})
                .transition()
                .duration(2000)
                  .attr("xlink:href", "dog.svg")
                  .attr("x", width/2 - 28)
                  .attr("y",  12)
                  .attr("width", 60)
                  .attr("height", 60)


          })

// step 2 introduces boy dogs
// this needs help!

    d3.select("#second-step")
          .on('stepin', function() {
            d3.select(".titlebox2").style('visibility', 'visible')
            d3.select(".titlebox1").style('visibility', 'hidden')
            d3.select(".infobox2").style('visibility', 'hidden')

            console.log("step 2")
            svg.selectAll(".Bella")
              .transition()
              .duration(700)
                .attr("cx", 0)
              .transition()
              .duration(1000)
                .attr("opacity", 0)
            svg.selectAll("image").remove()
            svg.selectAll(".yay")
              .data(names_gender)
              .enter().append("circle")
              .filter(function(d) {return d.n > 290 && d.gender === "M"})
              .transition()
              .duration(2000)
              .attr("cy", height/2)
              .attr("cx", function(d){
                return scalePoint_m(d.dog_name)
              })
              .attr("r", function(d){
                return radiusScale(d.n)
              })
              .attr("fill", "#9ebcda")
              // .on("mouseover", function(d){
              //         d3.select(this)
              //             .transition()
              //             .duration(100)
              //             .attr("fill", "#810f7c")
              //             .attr('r', function(d){
              //               return radiusScale(d.n) + 5
              //             })
              //             .style("cursor", "pointer")
              //
              //         // d3.select('.infobox .dog_name').text(d['dog_name'])
              //         // d3.select(".infobox").style('visibility', 'visible')
              //   })

            svg.append('g').selectAll('.myPoint')
              .data(names_gender)
              .enter().append('image')
              .filter(function(d) {return d.n > 290 && d.gender === "M"})
              .attr("xlink:href", "dog2.svg")
              .transition()
              .duration(2000)
              .attr("x", function(d){ return scalePoint_m(d.dog_name) - 18 })
              .attr("y", function(d){ return (height/2) -10 })
              .attr("width", 35)
              .attr("height", function(d){
                return radiusScale(d.n) + 5
              })
          })

// third step gets rid of circles

      d3.select("#third-step")
            .on('stepin', function() {
              d3.select(".titlebox2").style('visibility', 'hidden')
              svg.selectAll("circle")
                // .attr("class", "test")
                .transition()
                .duration(1000)
                  .attr("cx", 0)
                .transition()
                .duration(1000)
                  .attr("opacity", 0)
              svg.selectAll("image").remove()
            })
      d3.select("#zero-step")
        .on('stepin', function() {
          console.log("ya")
            svg.selectAll("circle")
              .data(names_gender)
              .enter().append("circle")
              .filter(function(d) {return d.n > 300 && d.gender === "F"})
              .attr("cy", height/2)
              .attr("class", "yay")
              .attr("cx", function(d){
                return scalePoint(d.dog_name)
              })
              .attr("r", function(d){
                return radiusScale(d.n)
              })
              .attr("fill", "#8c6bb1")
            svg.append('g').selectAll('.myPoint')
              .data(names_gender)
              .enter().append('image')
              .filter(function(d) {return d.n > 300 && d.gender === "F"})
              .attr("xlink:href", "dog.svg")
              .attr("x", function(d){ return scalePoint(d.dog_name) - 18 })
              .attr("y", function(d){ return (height/2) -10 })
              .attr("width", 35)
              .attr("height", function(d){
                return radiusScale(d.n) + 5
              })
              })


  }

})()
