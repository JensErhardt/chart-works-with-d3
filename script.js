const data = [5, 20, 40, 50, 60];

const width = 500;
const height = 500;

const widthScale = d3.scaleLinear()
    .domain([0, 60])
    .range([0, width]);

const colorScale = d3.scaleLinear()
    .domain([0, 60])
    .range(["red", "blue"]);

const axis = d3.axisBottom()
    .scale(widthScale);

const container = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(20, 0)");

const bars = container.selectAll("rect")
    .data(data)
    .enter()
        .append("rect")
        .attr("width", function (d) {
        return widthScale(d);
        })
        .attr("height", 25)
        .attr("fill", function(d) {
            return colorScale(d);
        })
        .attr("y", function (d, i) {
        return i * 50;
        });

container.append("g")
        .attr("transform", "translate(0, 400)")
        .call(axis);
