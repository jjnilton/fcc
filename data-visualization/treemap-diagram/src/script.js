const element = d3.select("#d3");
const chart = element.append("svg");

const width = 900;
const height = 700;


chart
  .attr("width", width + 100)
  .attr("height", height)

// https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json
d3.json("https://raw.githubusercontent.com/jjnilton/freecodecamp-projects/main/data-visualization/treemap-diagram/data/video-game-sales-data.json")
  .then(json => {
   const dataset = json;
  
  const treemap = d3.treemap()
                    .size([width - 75, height])
                    .padding(0)
                    .paddingInner(1)
  
  const root = d3.hierarchy(dataset)
                 .eachBefore((d) => {
                   d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
                 })
                 .sum(function(d) { return d.value })
                 .sort(function (a, b) {
                  return b.height - a.height || b.value - a.value;
                });
  
  
  
  treemap(root);
  
  const colors = ["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01", "#646a58", "#d5097e", "#bb73a9"];
  
  const color = d3.scaleOrdinal(colors);
  
  const tooltip = element
                    .append("div")
                    .attr("id", "tooltip")
                    .style("position", "absolute")
                    .style("background-color", "rgba(100, 100, 100, 0.8)")
                    .style("color", "white")
                    .style("padding", "10px")
                    .style("opacity", "0")
                    .style("pointer-events", "none")
  
  const tile = chart.selectAll("g")
                    .data(root.leaves())
                    .enter()
                    .append("g")
                    .attr("class", "group")
                    .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`)

                
  
  tile
    .append("rect")
    .attr("class", "tile")
    .style("filter", "contrast(50%) brightness(1.2)")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("data", (d, i) => {
      return d.data.category
    })
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("fill", (d, i) => {
      return color(d.data.category)
    })
    .on("mouseover", (event, d) => {
      tooltip
        .attr("data-name", d.data.name)
        .attr("data-value", d.data.value)
        .html(`<div>${d.data.name}</div><div>${d.data.category}</div><div>${d.data.value}</div>`)
        .style("left", event.clientX + "px")
        .style("top", event.clientY + "px")
        .style("opacity", "1")
    })
    .on("mousemove", (event, d) => {
      tooltip
        .style("left", event.clientX + "px")
        .style("top", event.clientY + "px")
    })
    .on("mouseout", (event, d) => { tooltip.style("opacity", "0") })
  
  tile
    .append("text")
    .attr("class", "tile-text")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .selectAll("tspan")
    .data((d) => {
     console.log(d.data.name)
     return d.data.name.split(" ") 
    })
    .enter()
    .append("tspan")
    .text((d) => d)
    .attr('x', 4)
    .attr('y', function (d, i) {
      return 10 + i * 10;
    })
        

  const legend = d3.legendColor()
                   .scale(color)
  
  
    chart.append("g")
       .attr("id", "legend")
       .attr("transform", "translate(850, 0)")
       .style("font-size", "12px")
       .call(legend)
  
    chart.selectAll(".swatch")
         .attr("class", "legend-item")
    
})
