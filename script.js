// ---> Bar chart 1 <---
const data = [5, 20, 40, 50, 60];

let width = 600;
let height = 300;

const margin = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20
};

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

const widthScale = d3.scaleLinear()
    .domain([0, 60])
    .range([0, width]);

const colorScale = d3.scaleLinear()
    .domain([0, 60])
    .range(["red", "yellow"]);

const axis = d3.axisBottom()
    .scale(widthScale);

const svg1 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.right)
    .attr("class", "bar-chart-1")
    .append("g")
    .attr("transform" , "translate(" + margin.top + "," + margin.right + ")")


const bars1 = svg1.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", function (d) {
        return widthScale(d);
    })
    .attr("height", 25)
    .attr("fill", function (d) {
        return colorScale(d);
    })
    .attr("y", function (d, i) {
        return i * 50;
    });

svg1.append("g")
    .attr("transform", "translate(0, 250)")
    .call(axis);

// ---> Bar chart 2 <---

