const data = [5, 20, 40, 50, 60];

// ---> Bar chart 1 <---
const width = 500;
const height = 300;

const widthScale = d3.scaleLinear()
    .domain([0, 60])
    .range([0, width]);

const colorScale = d3.scaleLinear()
    .domain([0, 60])
    .range(["red", "blue"]);

const axis = d3.axisBottom()
    .scale(widthScale);

const container1 = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bar-chart-1")
    .append("g")
    .attr("transform", "translate(20, 0)");

const bars1 = container1.selectAll("rect")
    .data(data)
    .enter()
        .append("rect")
        .attr("width", function(d) {
        return widthScale(d);
        })
        .attr("height", 25)
        .attr("fill", function(d) {
            return colorScale(d);
        })
        .attr("y", function(d, i) {
        return i * 50;
        });

container1.append("g")
        .attr("transform", "translate(0, 250)")
        .call(axis);

// ---> Bar chart 2 <---

const width2 = 500;
const height2 = 300;

const data2 = [10, 20, 23, 100, 120, 350, 400, 500, 680];

const barPadding = 5;
const barWidth = width2 / data2.length;

const xScale = d3.scaleBand()
        .range([0, width2])
        .padding(0.1);

const yScale = d3.scaleLinear()
        .domain([0, Math.max(...data2)])
        .range([height, 0]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
  
const container2 = d3.select("body")
        .append("svg")
        .attr("width", width2)
        .attr("height", height2)
        .attr("class", "bar-chart-2");

const bars2 = container2.selectAll("rect")
        .data(data2)
        .enter()
            .append("rect")
            .attr("height", function(d) {
                return d;
            })
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("width", barWidth - barPadding)
            .attr("x", function(d, i) {
                return xScale(i);
            })
            .attr("fill", function(d) {
                return colorScale(d);
            })
            .attr("transform", function(d, i) {
                const translate = [barWidth * i, 0];
                return "translate("+ translate +")";
            });

container2.append("g")
        .attr("transform", "translate(0, 250)")
        //.attr("transform", "translate(0, " + (height) + ")")
        .call(xAxis);

container2.append("g")
        .attr("transform", "translate(30, 0)")
        .call(yAxis);

