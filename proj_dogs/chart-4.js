(function() {

  var margin = { top: 20, right: 10, bottom: 50, left: 10 }

  var width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

  // var svg = d3.select("#graphic-4").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.queue()
    .defer(d3.csv, "./data/guess.csv")
    .await(ready)

    function ready(error, guess) {
      console.log(guess)


    d3.select("#Man-button")
      .on('click', function(d){
        console.log("i was clicked")
        d3.select(".infobox4").style('visibility', 'visible')
          // .data(guess)
          // .enter().append('text')
          // .filter(function(d){
          //   return d.borough === "Manhattan"
          // })

        d3.select('.infobox4 .guess-m')
        .style('font-size', "14px")
          // .data(guess)
          // .enter().append('text')
          // .filter(function(d){
          //   return d.borough === "Manhattan"
          // })
          // .text('You have a ' + d['dominant_color'] + d['gender'] + ' dog named ' + d['dog_name'])
      })
      d3.select("#Brooklyn-button")
        .on('click', function(d){
          console.log("i was clicked")
          d3.select(".infobox5").style('visibility', 'visible')
          d3.select('.infobox5 .guess-b')
            .style('font-size', "14px")
          // d3.select(".infobox4").style('visibility', 'hidden')
        })
      d3.select("#Queens-button")
        .on('click', function(d){
          console.log("i was clicked")
          d3.select(".infobox6").style('visibility', 'visible')
            .style('font-size', "14px")
          d3.select('.infobox6 .guess-q')
          // d3.select(".infobox5").style('visibility', 'hidden')
        })
      d3.select("#Bronx-button")
        .on('click', function(d){
          console.log("i was clicked")
          d3.select(".infobox7").style('visibility', 'visible')
          d3.select('.infobox7 .guess-br')
          .style('font-size', "14px")
        })
        d3.select("#Staten-button")
          .on('click', function(d){
            console.log("i was clicked")
            d3.select(".infobox8").style('visibility', 'visible')
            d3.select('.infobox8 .guess-s')
              .style('font-size', "14px")
          })
  }

})()
