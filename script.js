const from = $("#from").val();
const to = $("#to").val();

const api = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + from + "&end=" + to;

document.addEventListener("DOMContentLoaded", function () {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const data = parse(response);
      drawLineChart(data);

      const linear = simpleLinearRegression(response)
      const prognoses = parseLinear(linear, data)
      drawLineChart2(prognoses)

      calculateRandomByMax(data)
      drawLineChart1(data);
    })
    .catch((err) => { console.log(err) })
});

function arrayOf(data) {
  let arr = [];

  for (const i in data.bpi) {
    arr.push(data.bpi[i])

  }
  return arr;
}

function parse(data) {
  let arr = [];

  for (const i in data.bpi) {
    arr.push({
      date: new Date(i),
      value: +data.bpi[i]
    });
  }

  return arr;
}

function parseLinear(linear, data) {
  let arr = [];
  
  for (const i in linear) {
    console.log(data[i].date)
    arr.push({
      date: i,
      value: +linear[i]
    });
  }
  console.log("parseLinear", arr)
  return arr;
}

function calculateRandomByMax(data) {
  const max = $("#maximum").val()
  const arr = [];

  for (let date of data) {
    date.value = Math.floor((Math.random() * max) + 1)
  }

  return arr;
}

function simpleLinearRegression(data) {
  const arr = arrayOf(data)
  const linear = [];

  for (let i = 0; i < arr.length; i++) {
    linear.push(linearProject(arr, i))
  }
  return linear;
}

function LineFitter() {
  this.count = 0;
  this.sumX = 0;
  this.sumX2 = 0;
  this.sumXY = 0;
  this.sumY = 0;
}

LineFitter.prototype = {
  'add': function (x, y) {
    this.count++;
    this.sumX += x;
    this.sumX2 += x * x;
    this.sumXY += x * y;
    this.sumY += y;
  },
  'project': function (x) {
    var det = this.count * this.sumX2 - this.sumX * this.sumX;
    var offset = (this.sumX2 * this.sumY - this.sumX * this.sumXY) / det;
    var scale = (this.count * this.sumXY - this.sumX * this.sumY) / det;
    return offset + x * scale;
  }
};

function linearProject(data, x) {
  let fitter = new LineFitter();

  for (let i = 0; i < data.length; i++) {
    fitter.add(i, data[i]);
  }
  return fitter.project(x);
}

function drawLineChart(data) {

  const svgWidth = 600, svgHeight = 400;
  const margin = {
    top: 20, right: 20,
    bottom: 30, left: 50
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  let svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
    .attr("x", (svgWidth / 2))
    .attr("y", (margin.top / 2 + 10))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-family", "helvetica")
    .style("text-decoration", "underline")
    .text("Bitcoin Price Index " + from + " to " + to);

  const x = d3.scaleTime().rangeRound([0, width]);

  const y = d3.scaleLinear().rangeRound([height, 0]);

  let line = d3.line()
    .x(function (d) { return x(d.date) })
    .y(function (d) { return y(d.value) })
  x.domain(d3.extent(data, function (d) { return d.date }));
  y.domain(d3.extent(data, function (d) { return d.value }));

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}

function drawLineChart1(data) {

  const svgWidth = 600, svgHeight = 400;
  const margin = {
    top: 30, right: 20,
    bottom: 30, left: 50
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  let svg = d3.select(".line-chart-1")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
    .attr("x", (svgWidth / 2))
    .attr("y", (margin.top / 2 + 10))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-family", "helvetica")
    .style("text-decoration", "underline")
    .text("Randomized Bitcoin Price Index " + from + " to " + to);

  const x = d3.scaleTime().rangeRound([0, width]);

  const y = d3.scaleLinear().rangeRound([height, 0]);

  let line = d3.line()
    .x(function (d) { return x(d.date) })
    .y(function (d) { return y(d.value) })
  x.domain(d3.extent(data, function (d) { return d.date }));
  y.domain(d3.extent(data, function (d) { return d.value }));

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}

function drawLineChart2(data) {

  const svgWidth = 600, svgHeight = 400;
  const margin = {
    top: 30, right: 20,
    bottom: 30, left: 50
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  let svg = d3.select(".line-chart-2")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
    .attr("x", (svgWidth / 2))
    .attr("y", (margin.top / 2 + 10))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-family", "helvetica")
    .style("text-decoration", "underline")
    .text("Linear Regression for BPI based on " + from + " to " + to);

  const x = d3.scaleLinear().rangeRound([0, width]);

  const y = d3.scaleLinear().rangeRound([height, 0]);

  let line = d3.line()
    .x(function (d) { return x(d.date) })
    .y(function (d) { return y(d.value) })
  x.domain(d3.extent(data, function (d) { return d.date }));
  y.domain(d3.extent(data, function (d) { return d.value }));

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
