(function() {

var margin = { top: 20, right: 0, bottom: 50, left: 70 }

var width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom

var svg = d3.select("#graphic-1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


// beginning of rando's code
    var icon = "\uf005";
    var fontSize = 24;
    var iconSpace = 3;
    var dataRating = [5, 4, 3, 2, 1]
    var dataIcons = [[dataRating[0], icon], [dataRating[1], icon], [dataRating[2], icon], [dataRating[3], icon], [dataRating[4], icon]];
    var dataText = ["When you hover over the stars...", "...you can show additional information next to the chart...", "...In this tutorial I will explain...", "...how you can make this interactive pictogram chart...", "...and customize the colors and icons."];
    var color = d3.scaleOrdinal()
    				.range(["#8d5524", "#e0ac69", "#c68642", "#ffdbac", "#f1c27d"]);
    var data = [[dataRating[0], icon, dataText[0]], [dataText[0], icon, dataText[0]], [dataText[0], icon, dataText[0]], [dataText[0], icon, dataText[0]], [dataText[0], icon, dataText[0]], [dataText[0], icon, dataText[0]],
    		    [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]],	[dataText[1], icon, dataText[1]],	[dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]], [dataText[1], icon, dataText[1]],
    			[dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]], [dataText[2], icon, dataText[2]],
    			[dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]], [dataText[3], icon, dataText[3]],
    			[dataText[4], icon, dataText[4]], [dataText[4], icon, dataText[4]], [dataText[4], icon, dataText[4]], [dataText[4], icon, dataText[4]]
    			];
    function updateText(className, newText){
    	$(className).text(newText);
    }

    function plotPictogramChart(d) {
    	var row = 0;
    	var chart = d3.select("svg")
    					.attr("transform", "translate(0, 0)");

    	var icons = chart.selectAll("g")
    					.data(d).enter()
    						.append("g");

    	// icons.append("text")
    	// 	.on("mouseover", function(d){ updateText("p", d[2]); })
    	// 	.attr("x", function(d, i){ return ((i%10 + 1) * (fontSize + 1 + iconSpace)) - fontSize;})
    	// 	.attr("y", function(d, i){ if(i%10 == 0){row++}; return row * fontSize;})
    	// 	.attr('font-family', 'FontAwesome')
    	// 	.attr('font-size', fontSize)
    	// 	.attr("fill", function(d){ return color(d);})
    	// 	.text(function(d) { return "\u00A0 " + d[1]; });
    }

    plotPictogramChart(data);
    // end of rando's code
//-------------------------//
// DATA
// d3.queue()
//   .defer(d3.csv, "bully.csv")
//   .await(ready)
//
// function ready(error, data) {
//   console.log(data)

// defining variables


// d3.select("#first-step")
//     .on('stepin', function() {
//       console.log("step 1")
//
//         })
        // end of step 1



// }
// end of data



})()
