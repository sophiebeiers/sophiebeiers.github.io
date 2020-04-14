(function() {
  var width = 900;
  height = 750;

  let margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
  let svg = d3
    .select('#chart')
    .append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // defs for photos
  var defs = svg.append("defs");

  // data
  Promise.all([
      d3.csv('bach2.csv'),
    ])
    .then(ready)
    .catch(err => {
      console.log('Failed with', err)
    })


  function ready([
    data
  ]) {


    var grouped_girls = d3.nest()
      .key(function(d) {
        return d.id;
      })
      .entries(data);


    var xScale = d3
      .scaleLinear()
      .range([90, width - 100])
      .domain([1, 8])

    var weeks = ["Week1", "Week 2", "Week3", "Week4", "Week5", "Week6", "Week7", "Week8"]
    svg.append("g")
      .attr("transform", "translate(0," + 20 + ")")

      .call(d3.axisTop(xScale).ticks(8).tickFormat(function(d, i) {
        return weeks[i]
      }))
      .selectAll("text")
      .attr("class", "x-axis-text")
      .style("text-anchor", "middle");


    var yScale = d3
      .scaleLinear()
      .range([10, height])
      .domain([0, 40])
    //

    // axis labels
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - (height - 300))
      .attr("dy", "1em")
      .attr("class", "x-axis-text")
      .style("text-anchor", "middle")
      .html("Picked early   " + "&#x2192;");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 0)
      .attr("x", 0 - (height - 50))
      .attr("dy", "1em")
      .attr("class", "x-axis-text")
      .style("text-anchor", "middle")
      .html("&#x2190;" + "    Picked late  ");


console.log('hey')
    // the connecting lines
    svg.selectAll(".line")
      .data(grouped_girls)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr('class', d => {
        return d['key']
      })
      .attr("stroke", "#FF878E")
      .attr("stroke-width", 0.8)
      .attr("d", function(d) {
        return d3.line()
          .x(function(d) {
            return xScale(d.week);
          })
          .y(function(d) {
            return yScale(+d.place) * 1.9;
          })
          (d.values)
      })

    // the images
    defs.selectAll(".women-pattern")
      .data(data)
      .enter().append("pattern")
      .attr("class", "women-pattern")
      .attr("id", function(d) {
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
      .attr("xlink:href", function(d) {
        return d.image_path
      });

    // circles
    svg.selectAll("#women")
      .data(data)
      .enter()
      .append('circle')
      .attr('class', d => {
        return d['id']
      })
      .attr('data-tippy-content', d => `<div style="text-align: left; font-family: 'Roboto Mono', monospace;">
      <b>Name:</b> ${'&nbsp;'.repeat(1)}${d.name}<br>
    </div>`)
      .attr("id", "women")
      .attr("r", 15)
      .attr("cx", function(d) {
        return xScale(d.week)
      })
      .attr("cy", function(d) {
        return yScale(d.place) * 1.9
      })
      .attr("fill", function(d) {
        return "url(#" + d.id + ")"
      })
    // .attr("data-tippy-content", d => d.data.week);

    // mouseover events
    svg.selectAll('#women')
      .on('mouseover', function(d) {
        var className = d['id']
        var circleUnderMouse = this;
        console.log(this)
        d3.selectAll('path.' + className)
          .transition()
          .attr('stroke-width', '3')
          .attr('stroke', 'red')
          // bring to front
          .each(function() {
            this.parentNode.appendChild(this);
          });
        d3.selectAll('circle.' + className)
          .raise()
          .attr('r', 30)
          .attr("stroke", "red")
          .attr('stroke-width', 2)
        // make all the other ones fade
        d3.selectAll('circle')
          .transition()
          .attr('opacity', function() {
            return (this.getAttribute('class') === className) ? 1 : 0.5;
          })
      })
      .on('mouseout', function(d) {
        var className = d['id']
        d3.selectAll('path.' + className)
          .transition()
          .attr('stroke-width', '0.8')
          .attr('stroke', '#FF878E')
          .style('z-index', 1)
        d3.selectAll('circle.' + className)
          .raise()
          .attr('r', 15)
          .attr('stroke-width', 0)
        d3.selectAll('circle')
          .transition()
          .attr('opacity', 1)

      })

    tippy('svg circle', {
      arrow: true,
      size: 'large',
      animation: 'scale',
      theme: 'pink',
    })


    // steps
    d3.select('#two').on('stepin', (d) => {
      svg
        .selectAll('path')
        .attr('opacity', 0.2)
      svg
        .selectAll('#women')
        .attr('opacity', function(d) {
          if (d.week === "1") {
            return 1
          } else {
            return 0.2
          }
        })
        .transition()
        .duration(800)

        .attr('fill', function(d) {
          if (d.left === "yes" && d.week === "1") {
            return "#C4515C"
          } else {
            return "url(#" + d.id + ")"
          }
        })
    })

    d3.select('#three').on('stepin', () => {
      svg
        .selectAll('#women')
        .transition()
        .duration(800)
        .attr('opacity', function(d) {
          if (d.week == "2") {
            return 1
          } else {
            return 0.2
          }
        })
        .transition()
        .duration(800)

        .attr('fill', function(d) {
          if (d.left == "yes" && d.week == "2") {
            return "#C4515C"
          } else {
            return "url(#" + d.id + ")"
          }
        })
    })

    d3.select('#four').on('stepin', () => {
      svg
        .selectAll('circle')
        .transition()
        .duration(800)
        .attr('opacity', function(d) {
          if (d.week == "3") {
            return 1
          } else {
            return 0.2
          }
        })
        .transition()
        .duration(800)

        .attr('fill', function(d) {
          if (d.left == "yes" && d.week == "3") {
            return "#C4515C"
          } else {
            return "url(#" + d.id + ")"
          }
        })
    })


  } // end of data section

})(); // end of script
