const element = document.querySelector("#d3")
const chart = d3.select(element);

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then((data) => {
  const dataset = data;
  
  const width = 800;
  const height = 600;
  const padding = 60;
  
  const svg = chart.append("svg")
                   .attr("width", width)
                   .attr("height", height)
                    
  const yearsArray = dataset.map(item => new Date(item.Year.toString()));

  const timeArray = dataset.map(item => item.Seconds);
  
  const minutesArray = dataset.map(item => item.Time);
  
  let minuteFormat = d3.timeParse("%M:%S");
  const formatMinute = d3.timeFormat("%M:%S")
  let parsedMinutes = minutesArray.map(item => new Date(minuteFormat(item).setFullYear("1970")));
  
  
  
  const xScale = d3.scaleTime()
                   .domain([d3.timeParse("%Y")(d3.min(yearsArray).getFullYear()), d3.timeParse("%Y")(d3.max(yearsArray).getFullYear() + 2) ])
                   .range([padding, width - padding]);
  
  const yScale = d3.scaleTime()
                   .domain(d3.extent(parsedMinutes, (d) => {
                     return d
                   }).reverse())
                   .range([height - padding, padding]);
  
  
  let color = d3.scaleOrdinal(d3.schemeSet1);
  
  const tooltip = d3.select(element)
                    .append("div")
                    .attr("id", "tooltip")
                    .style("position", "absolute")
                    .style("width", "auto")
                    .style("height", "auto")
                    .style("background-color", "rgba(200, 200, 200, 0.75)")
                    .style("pointer-events", "none")
                    .style("padding", "5px")
                    .style("border-radius", "5px")
                    .style("font-family", "sans-serif")
                    .style("font-size", "12px")
                    .style("opacity", "0")
  

  
  svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", (d, i) => xScale(yearsArray[i]))
     .attr("cy", (d, i) => yScale(parsedMinutes[i]))
     .attr("r", 5)
     .attr("class", "dot")
     .attr("data-xvalue", (d, i) => d.Year)
     .attr("data-yvalue", (d, i) => parsedMinutes[i].toISOString())
     .attr("stroke", "black")
     .attr("opacity", "0.8")
     .attr("fill", (d) => {
        return color(d.Doping === "");
     })
     .on("mouseover", (event, d) => {
        console.log(event.currentTarget);
        tooltip
          .attr("data-year", d.Year)
          .html(`<div>${d.Name} (${d.Nationality})</div>
                 <div>Time: ${d.Time}, Year: ${d.Year}</div>
                 <div>${d.Doping}</div>`)
          .style("left", `${event.clientX}px`)
          .style("top", `${event.clientY}px`)
          .style("opacity", "1")
    
     })
     .on("mouseout", (event, d) => {
        tooltip
          .style("opacity", "0")
  })
  // svg.selectAll("text")
  //    .data(dataset)
  //    .enter()
  //    .append("text")
  //    .attr("x", (d, i) => xScale(yearsArray[i]))
  //    .attr("y", (d, i) => yScale(parsedMinutes[i]))
  //    .text((d, i) => `${d.Time}, ${d.Year}`)
  
  
  const xAxis = d3.axisBottom(xScale)
  
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padding})`)
    .attr("class", "x-axis")
    .call(xAxis)
  
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(formatMinute)
  
  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .attr("class", "y-axis")
    .call(yAxis)
  
  const legend = svg.append("g")
     .attr("id", "legend")
  
  
  const legendItem = legend.selectAll(".legend-item")
                           .data(color.domain())
                           .enter()
                           .append('g')
                           .attr("class", "legend-item")
                           .attr("transform", (d, i) => {
                             return `translate(0, ${height / 2 - i * 15})`;
                           })
  
  legendItem
    .append("circle")
    .attr("cx", width - 50)
    .attr("r", 5)
    .attr("fill", color);
  
  legendItem
    .append("text")
    .attr("x", width - 60)
    .attr("y", 0)
    .attr("dy", '0.32em')
    .text((d) => {
      return d ? "No doping" : "Alleged doping"
    }) 
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .style("text-align", "right")
     
})