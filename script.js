const api = "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-31&end=2019-02-22"

document.addEventListener("DOMContentLoaded", function () {
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const data = parse(response);

      drawLineChart(data);
      
      calculateRandom(data)
      drawLineChart1(data);
    })
    .catch((err) => { console.log(err) })
});

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
    .text("Bitcoin Price Index 2019-01-31 to 2019-02-22");

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

function calculateRandom(data) {
  const max = $("#maximum").val()

  for (let date of data) {
    date.value = Math.floor((Math.random() * max) + 1)
    console.log(date)
  }
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
    .text("Interactive line chart");

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


