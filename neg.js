var marginD = {top: 20, right: 30, bottom: 40, left: 30},
    widthD = 620 - margin.left - margin.right,
    heightD = 500 - margin.top - margin.bottom;

var xD = d3.scale.linear()
    .range([0, width]);

var yD = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

var xAxisD = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxisD = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var svgD = d3.select(".d").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", typeD, function(error, data) {
  xD.domain(d3.extent(data, function(d) { return d.value; })).nice();
  yD.domain(data.map(function(d) { return d.name; }));

  svgD.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand());

  svgD.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisD);

  svgD.append("g")
      D.attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxisD);
});

function typeD(d) {
  d.value = +d.value;
  return d;
}
