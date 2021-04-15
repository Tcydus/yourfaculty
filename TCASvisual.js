var data = [],
  svg,
  defs,
  gBrush,
  brush,
  main_xScale,
  mini_xScale,
  main_yScale,
  mini_yScale,
  main_xAxis,
  main_yAxis,
  mini_width,
  brushTotalStart,
  brushTotalEnd,
  updatedData,
  mousewheelTimer,
  scrolling = false,
  scrollEnd = false;

var tcas63Flag = true, tcas62Flag = false, tcas61Flag = false;
var tcasIDLocation = "#TCASChart";

document.getElementById("tcas63Btn").addEventListener("click", function () {
  // document.getElementById("demo").innerHTML = "Hello World";
  tcas63Flag = true, tcas62Flag = false, tcas61Flag = false;
  callTCASGraph();
});
document.getElementById("tcas62Btn").addEventListener("click", function () {
  tcas63Flag = false, tcas62Flag = true, tcas61Flag = false;
  callTCASGraph();
});
document.getElementById("tcas61Btn").addEventListener("click", function () {
  tcas63Flag = false, tcas62Flag = false, tcas61Flag = true;
  callTCASGraph();
});


callTCASGraph();

function callTCASGraph() {
  if (tcas63Flag) {
    d3.json("TCASData/TCAS63.json", function (error, dataTemp) {
      data = []
      dataTemp.forEach(element => {
        data.push(element)
      });
      TCASBarChart(tcasIDLocation, tcas63Flag);
    });
  }
  else if (tcas62Flag) {
    d3.json("TCASData/TCAS62.json", function (error, dataTemp) {
      data = []
      dataTemp.forEach(element => {
        data.push(element)
      });
      TCASBarChart(tcasIDLocation, tcas62Flag);
    });
  }
  else {
    d3.json("TCASData/TCAS61.json", function (error, dataTemp) {
      data = []
      dataTemp.forEach(element => {
        data.push(element)
      });
      TCASBarChart(tcasIDLocation, tcas61Flag);
    });
  }
}



function TCASBarChart(id, visible) {
  //Didn't execute algorithm when invisible
  if (!visible) return;

  //Create the random data

  data.sort(function (a, b) { return b.value - a.value; });
  console.log(data)
  /////////////////////////////////////////////////////////////
  ///////////////// Set-up SVG and wrappers ///////////////////
  /////////////////////////////////////////////////////////////

  //Added only for the mouse wheel

  var zoomer = d3.behavior.zoom()
    .on("zoom", null);

  var main_margin = { top: 10, right: 10, bottom: 30, left: 250 },
    main_width = 700 - main_margin.left - main_margin.right,
    main_height = 400 - main_margin.top - main_margin.bottom;

  var mini_margin = { top: 10, right: 10, bottom: 30, left: 10 },
    mini_height = 400 - mini_margin.top - mini_margin.bottom;
  mini_width = 100 - mini_margin.left - mini_margin.right;

  //  delete old graphic
  svg = d3.select(id).selectAll("svg").remove();

  svg = d3.select(id).append("svg")
    .attr("class", "svgWrapper")
    .attr("width", main_width + main_margin.left + main_margin.right + mini_width + mini_margin.left + mini_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom)
    .call(zoomer)
    .on("wheel.zoom", scroll)
    //.on("mousewheel.zoom", scroll)
    //.on("DOMMouseScroll.zoom", scroll)
    //.on("MozMousePixelScroll.zoom", scroll)
    //Is this needed?
    .on("mousedown.zoom", null)
    .on("touchstart.zoom", null)
    .on("touchmove.zoom", null)
    .on("touchend.zoom", null);

  var mainGroup = svg.append("g")
    .attr("class", "mainGroup")
    .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")");

  var miniGroup = svg.append("g")
    .attr("class", "miniGroup")
    .attr("transform", "translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  var brushGroup = svg.append("g")
    .attr("class", "brushGroup")
    .attr("transform", "translate(" + (main_margin.left + main_width + main_margin.right + mini_margin.left) + "," + mini_margin.top + ")");

  /////////////////////////////////////////////////////////////
  ////////////////////// Initiate scales //////////////////////
  /////////////////////////////////////////////////////////////

  main_xScale = d3.scale.linear().range([0, main_width]);
  mini_xScale = d3.scale.linear().range([0, mini_width]);

  main_yScale = d3.scale.ordinal().rangeRoundBands([0, main_height], 0.6, 0);
  mini_yScale = d3.scale.ordinal().rangeBands([0, mini_height], 0.6, 0);

  //Create x axis object
  main_xAxis = d3.svg.axis()
    .scale(main_xScale)
    .orient("bottom")
    .ticks(4)
    //.tickSize(0)
    .outerTickSize(0);

  //Add group for the y axis
  mainGroup.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (main_height + 5) + ")");

  //Create y axis object
  main_yAxis = d3.svg.axis()
    .scale(main_yScale)
    .orient("left")
    .tickSize(0)
    .outerTickSize(0);

  //Add group for the y axis
  mainGroup.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(-5,0)");

  /////////////////////////////////////////////////////////////
  /////////////////////// Update scales ///////////////////////
  /////////////////////////////////////////////////////////////

  //Update the scales
  main_xScale.domain([0, d3.max(data, function (d) { return d.value; })]);
  mini_xScale.domain([0, d3.max(data, function (d) { return d.value; })]);
  main_yScale.domain(data.map(function (d) { return d.name; }));
  mini_yScale.domain(data.map(function (d) { return d.name; }));

  //Create the visual part of the y axis
  d3.select(".mainGroup").select(".y.axis").call(main_yAxis);

  brushTotalStart = mini_yScale.domain()[0];
  brushTotalEnd = mini_yScale.domain()[1];

  /////////////////////////////////////////////////////////////
  ///////////////////////// Create brush //////////////////////
  /////////////////////////////////////////////////////////////

  //What should the first extent of the brush become - a bit arbitrary this
  // var brushExtent = Math.max(1, Math.min(20, Math.round(data.length * 0.2)));
  // var brushExtent = Math.round(data.length / 2) - 1;
  var brushExtent = 6;
  // var brushExtent = 10;

  brush = d3.svg.brush()
    .y(mini_yScale)
    .extent([mini_yScale(data[0].name), mini_yScale(data[brushExtent].name)])
    .on("brush", brushmove)
    .on("brushend", brushend);

  //Set up the visual part of the brush
  gBrush = d3.select(".brushGroup").append("g")
    .attr("class", "brush")
    .call(brush);

  gBrush.selectAll(".resize")
    .append("line")
    .attr("x2", mini_width);

  gBrush.selectAll(".resize")
    .append("path")
    .attr("d", d3.svg.symbol().type("triangle-up").size(20))
    .attr("transform", function (d, i) {
      return i ? "translate(" + (mini_width / 2) + "," + 4 + ") rotate(180)" : "translate(" + (mini_width / 2) + "," + -4 + ") rotate(0)";
    });

  gBrush.selectAll("rect")
    .attr("width", mini_width);

  gBrush.select(".background")
    .on("mousedown.brush", brushcenter)
    .on("touchstart.brush", brushcenter);

  ///////////////////////////////////////////////////////////////////////////
  /////////////////// Create a rainbow gradient - for fun ///////////////////
  ///////////////////////////////////////////////////////////////////////////

  defs = svg.append("defs")

  //Create two separate gradients for the main and mini bar - just because it looks fun
  createGradient("gradient-rainbow-main", "60%");
  createGradient("gradient-rainbow-mini", "13%");

  /////////////////////////////////////////////////////////////
  //////////////// Set-up the main bar chart //////////////////
  /////////////////////////////////////////////////////////////

  //DATA JOIN
  var bar = d3.select(".mainGroup").selectAll(".bar")
    .data(data, function (d) { return d.key; });

  //UPDATE
  bar
    .attr("width", function (d) { return main_xScale(d.value); })
    .attr("y", function (d, i) { return main_yScale(d.name); })
    .attr("height", main_yScale.rangeBand());

  //ENTER
  bar.enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("width", function (d) { return main_xScale(d.value); })
    .attr("y", function (d, i) { return main_yScale(d.name); })
    .attr("height", main_yScale.rangeBand())
    .style("fill", "url(#gradient-rainbow-main)");

  //EXIT
  bar.exit()
    .remove();

  /////////////////////////////////////////////////////////////
  /////////////// Set-up the mini bar chart ///////////////////
  /////////////////////////////////////////////////////////////

  //The mini brushable bar
  //DATA JOIN
  var mini_bar = d3.select(".miniGroup").selectAll(".bar")
    .data(data, function (d) { return d.key; });

  //UDPATE
  mini_bar
    .attr("width", function (d) { return mini_xScale(d.value); })
    .attr("y", function (d, i) { return mini_yScale(d.name); })
    .attr("height", mini_yScale.rangeBand());

  //ENTER
  mini_bar.enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("width", function (d) { return mini_xScale(d.value); })
    .attr("y", function (d, i) { return mini_yScale(d.name); })
    .attr("height", mini_yScale.rangeBand())
    .style("fill", "url(#gradient-rainbow-mini)");

  //EXIT
  mini_bar.exit()
    .remove();

  //Start the brush
  gBrush.call(brush.event);

}//init

//Function runs on a brush move - to update the big bar chart
function update(data) {

  //The transition (& delay) time of the bars and the axis
  var transTime = 400;
  var delayTime = scrollEnd ? 0 : transTime;

  /////////////////////////////////////////////////////////////
  ///////////////////// Update the axis ///////////////////////
  /////////////////////////////////////////////////////////////

  //Update the domain of the x & y scale of the big bar chart
  main_yScale.domain(data.map(function (d) { return d.name; }));

  //Update the y axis of the big chart
  d3.select(".mainGroup")
    .select(".y.axis")
    .transition()
    .duration(transTime)
    .call(main_yAxis);

  main_xScale.domain([0, d3.max(data, function (d) { return d.value; })]);

  //Update the x axis of the big chart
  d3.select(".mainGroup")
    .select(".x.axis")
    .transition()
    .duration(transTime)
    .call(main_xAxis);

  /////////////////////////////////////////////////////////////
  ////////// Update the bars of the main bar chart ////////////
  /////////////////////////////////////////////////////////////

  //DATA JOIN
  var bar = d3.select(".mainGroup").selectAll(".bar")
    .data(data, function (d) { return d.key; });

  //UPDATE
  bar
    .transition().duration(transTime)
    .attr("x", 0)
    .attr("width", function (d) { return main_xScale(d.value); })
    .attr("y", function (d, i) { return main_yScale(d.name); })
    .attr("height", main_yScale.rangeBand());

  //ENTER
  bar.enter().append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("width", 0)
    .attr("y", function (d, i) { return main_yScale(d.name); })
    .attr("height", main_yScale.rangeBand())
    .style("fill", "url(#gradient-rainbow-main)")
    .transition().duration(transTime).delay(delayTime)
    .attr("width", function (d) { return main_xScale(d.value); });

  //EXIT
  bar.exit()
    .transition().duration(transTime)
    .attr("height", 0)
    .style("opacity", 0)
    .remove();

}//update

/////////////////////////////////////////////////////////////
////////////////////// Brush functions //////////////////////
/////////////////////////////////////////////////////////////

//First function that runs on a brush move
function brushmove() {

  //What is the extent of the brush
  var extent = brush.extent();

  //Adjust the extent of the brush so that is snaps to the bars
  if (d3.event.mode === "move" || scrollEnd === true) {
    //If dragging, preserve the width of the extent

    //Does the top edge lie closer to the upper or lower bar
    var topExtent = extent[0];
    //Using ES5 - http://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
    var closestTop = mini_yScale.range().reduce(function (prev, curr) {
      return (Math.abs(curr - topExtent) < Math.abs(prev - topExtent) ? curr : prev);
    });

    //Pixel location of the bottom bar
    var maxBar = d3.max(mini_yScale.range());
    //Does the top edge lie closer to the upper or lower bar
    var bottomExtent = extent[1];
    //Using ES5 - http://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
    var closestBottom = mini_yScale.range().reduce(function (prev, curr) {
      return (Math.abs(curr - bottomExtent) < Math.abs(prev - bottomExtent) ? curr : prev);
    });

    //Don't let it go over the last bar in the design
    if (maxBar === closestBottom) {
      //The new extent that snaps to the bars
      extent = [closestBottom + mini_yScale.rangeBand() - (extent[1] - extent[0]), closestBottom + mini_yScale.rangeBand()];
    } else {
      //The new extent that snaps to the bars
      extent = [closestTop, closestTop + (extent[1] - extent[0])];
    }//else

  } else if (!scrolling) {
    //If changing size, snap to the nearest rect

    //Find the pixel values of the bars that lie within the selected brush
    var pixelRanges = mini_yScale.range()
      .filter(function (d) { return (d >= extent[0] - mini_yScale.rangeBand() / 2) && (d <= extent[1]); });

    //The new extent that snaps to the bars within the selection
    extent = [d3.min(pixelRanges), d3.max(pixelRanges) + mini_yScale.rangeBand()];
  }//else if 
  //else do nothing - then it comes from the scrolling and the extent has already been determined

  //Snap to rect edge - the new extent
  d3.select("g.brush")
    .call(brush.extent(extent));

  //What bars are captured in the brush
  //During scrolling take a wider range and don't snap
  if (scrolling) {
    var selected = mini_yScale.domain()
      .filter(function (d) { return (extent[0] - 1e-3 - mini_yScale.rangeBand() <= mini_yScale(d)) && (mini_yScale(d) <= extent[1] + 1e-3 + mini_yScale.rangeBand()); });
  } else {
    var selected = mini_yScale.domain()
      .filter(function (d) { return (extent[0] - 1e-3 <= mini_yScale(d)) && (mini_yScale(d) <= extent[1] + 1e-3); });
  }

  //Take a subset of the selected data from the original dataset
  updatedData = data.filter(function (d) { return selected.indexOf(d.name) > -1; });

  //Update the colors of the mini chart - Make everything outside the brush grey
  d3.select(".miniGroup").selectAll(".bar")
    .style("fill", function (d, i) { return selected.indexOf(d.name) > -1 ? "url(#gradient-rainbow-mini)" : "#e0e0e0"; });

  ////Update the main chart
  ////If you want to see update during a brush moving uncomment this
  ////But that doesn't work very well with the transitions of the bars in the update function & scrolling
  //update(updatedData);

}//brushmove

//Finally update the data
function brushend() {
  if (!scrolling) update(updatedData);
}

//Based on http://bl.ocks.org/mbostock/6498000
//What to do when the user clicks on another location along the brushable bar chart
function brushcenter() {
  var target = d3.event.target,
    extent = brush.extent(),
    size = extent[1] - extent[0],
    range = mini_yScale.range(),
    y0 = d3.min(range) + size / 2,
    y1 = d3.max(range) + mini_yScale.rangeBand() - size / 2,
    center = Math.max(y0, Math.min(y1, d3.mouse(target)[1]));

  d3.event.stopPropagation();

  gBrush
    .call(brush.extent([center - size / 2, center + size / 2]))
    .call(brush.event);

}//brushcenter


/////////////////////////////////////////////////////////////
///////////////////// Scroll functions //////////////////////
/////////////////////////////////////////////////////////////


//Function to calculate what should happen on a mouse scroll
function scroll() {

  if (mousewheelTimer) clearTimeout(mousewheelTimer);

  var extent = brush.extent(),
    size = extent[1] - extent[0],
    range = mini_yScale.range(),
    y0 = d3.min(range),
    y1 = d3.max(range),
    dy = d3.event.deltaY,
    topSection;

  scrolling = true;

  if (extent[0] - dy < y0) {
    topSection = y0;
  } else if (extent[1] - dy > y1) {
    topSection = y1 - size;
  } else {
    topSection = extent[0] - dy;
  }//else

  //Once the person stops scrolling, run the update data function
  mousewheelTimer = setTimeout(function () {
    mousewheelTimer = null;
    scrolling = false;
    scrollEnd = true;

    //Finally snap the brush and update the data
    gBrush
      .call(brush.event);

    scrollEnd = false;
  }, 200);

  d3.event.stopPropagation();
  d3.event.preventDefault();

  //Update the brush position during the scrolling
  if (scrolling) {
    gBrush
      .call(brush.extent([topSection, topSection + size]))
      .call(brush.event);
  }//if

}//scroll

/////////////////////////////////////////////////////////////
///////////////////// Helper functions //////////////////////
/////////////////////////////////////////////////////////////

//Create a gradient 
function createGradient(idName, endPerc) {

  // var coloursRainbow = ["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"];
  // var coloursRainbow = ["#F8E69C", "#AAE8C0", "#0EB2A6", "#17465F"];
  var coloursRainbow = ["#17465F", "#0EB2A6", "#AAE8C0", "#F8E69C"];
  defs.append("linearGradient")
    .attr("id", idName)
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", endPerc).attr("y2", "0%")
    .selectAll("stop")
    .data(coloursRainbow)
    .enter().append("stop")
    .attr("offset", function (d, i) { return i / (coloursRainbow.length - 1); })
    .attr("stop-color", function (d) { return d; });
}//createGradient

//Function to generate random strings of 5 letters - for the demo only
function makeWord() {
  var possible_UC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var text = possible_UC.charAt(Math.floor(Math.random() * possible_UC.length));

  var possible_LC = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible_LC.charAt(Math.floor(Math.random() * possible_LC.length));

  return text;
}//makeWord
