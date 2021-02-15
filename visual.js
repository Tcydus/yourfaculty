var classSelect = ".ranking-info"

var margins = {
  top: 12,
  left: 100,
  right: 14,
  bottom: 34
};
var legendPanel = {
  width: 1000
};

var dataset = [{
  data: [{
    yValue: 'Team A',
    xValue: 25
  }, {
    yValue: 'Team B',
    xValue: 10
  }, {
    yValue: 'Team C',
    xValue: 60
  }, {
    yValue: 'Team D',
    xValue: 80
  }, {
    yValue: 'Team E',
    xValue: 35
  }, {
    yValue: 'Team F',
    xValue: 45
  }, {
    yValue: 'Team G',
    xValue: 15
  }, {
    yValue: 'Team G',
    xValue: 15
  }],
  name: 'TCAS63'
  }];
var series = dataset.map(function (d) {
  return d.name;
});
var numberOfRecords = 0;
var dataset = dataset.map(function (d) {
  numberOfRecords = 0;
  return d.data.map(function (o, i) {
    numberOfRecords++;
    return {
      y: o.xValue,
      x: o.yValue,
      name: d.name
    };
  });
});


d3.select(window).on("resize", throttle);

var stack = d3.layout.stack();

stack(dataset);

var dataset = dataset.map(function (group) {
  return group.map(function (d) {
    // Invert the x and y values, and y0 becomes x0
    return {
      x: d.y,
      y: d.x,
      x0: d.y0,
      name:d.name
    };
  });
});

var yValues = dataset[0].map(function (d) {
  return d.y;
});

var xMax = d3.max(dataset, function (group) {
  return d3.max(group, function (d) {
    return d.x + d.x0;
  });
});

var tooltip = d3.select(classSelect)
.append('div')
.attr('id', 'tooltip')
.attr('class', 'hidden');

var width = window.innerWidth - margins.left - margins.right - legendPanel.width;
var barHeight = 20;
var height = (numberOfRecords * 40) - margins.top - margins.bottom;

var svg, xScale, yScale, rects;

draw(width, height);

function draw(width, height) {

  svg = d3.select(classSelect)
  .append('svg')
  .attr('width', width + margins.left + margins.right)
  .attr('height', height + margins.top + margins.bottom)
  .append('g')
  .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

  xScale = d3.scale.linear()
  .domain([0, xMax])
  .range([0, width]);

  yScale = d3.scale.ordinal()
  .domain(yValues)
  .rangeRoundBands([0, height], .1);
  var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom');
  var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left');
  var colours = d3.scale.category10();
  var groups = svg.selectAll('g')
  .data(dataset)
  .enter()
  .append('g')
  .style('fill', function (d, i) {
    return colours(i);
  });

  rects = groups.selectAll('rect')
  .data(function (d) {
    return d;
  })
  .enter()
  .append('rect')
  .attr('x', function (d) {
    return xScale(d.x0);
  })
  .attr('y', function (d, i) {
    return yScale(d.y);
  })
  .attr('height', function (d) {
    return barHeight;
  })
  .attr('width', function (d) {
    return xScale(d.x);
  })
  .on('mouseover', function (d) {

    var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
    var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;

    d3.select('#tooltip')
    .style('left', xPos + 'px')
    .style('top', yPos + 'px')
    .style('width', '250px')
    .text(d.y+'  '+d.name+': '+d.x);

    d3.select('#tooltip').classed('hidden', false);
  })
  .on('mouseout', function () {
    d3.select('#tooltip').classed('hidden', true);
  });

  svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(0,' + height + ')')
  .call(xAxis);

  svg.append('g')
  .attr('class', 'axis')
  .call(yAxis);

  var legend = d3.select(classSelect)
  .append('div')
  .attr('id', 'legend')
  .attr('class', 'row legend-row');
  legend.append('div')
  .attr('class', 'col-sm-4');
  var legendColor1 = legend.append('div')
  .attr('class', 'col-sm-4');
  legendColor1.append('div')
  .attr('class', 'legend-element')
  .attr('style', 'background-color:'+colours(0));
  legendColor1.append('div')
  .attr('style', 'margin-left: 15px;')
  .text(series[0]);

}

function redraw() {
  width = window.innerWidth - margins.left - margins.right - legendPanel.width;
  d3.select('svg').remove();
  d3.select('#legend').remove();
  draw(width,height);
}

var throttleTimer;
function throttle() {
  window.clearTimeout(throttleTimer);
  throttleTimer = window.setTimeout(function() {
    redraw();
  }, 200);
}