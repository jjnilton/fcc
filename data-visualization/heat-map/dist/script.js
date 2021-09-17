// https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json

const margin = { top: 30, right: 30, bottom: 30, left: 30 };
const width = 900 - margin.right - margin.left;
const height = 600 - margin.top - margin.bottom;


const element = d3.select("#d3");
const chart = d3.select("#d3")
                  .append("svg")
                  .attr("width", width + margin.right + margin.left)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left + margin.top})`)

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
  .then(json => {
  
  const dataset = json;
  
  const yearsArray = dataset.monthlyVariance.map((item) => item.year);
  const filteredArray = yearsArray.filter(year => year % 10 === 0);

  
  const xScale = d3.scaleBand()
                   .domain(yearsArray)
                   .range([0, width])
                   // .padding(0.01);

  const xAxis = d3.axisBottom(xScale)
                  .tickValues([...new Set(filteredArray)])
                  .tickSizeOuter(0)
 chart.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(-1, ${height})`)
      .call(xAxis);
  
  
  const yScale = d3.scaleBand()
                   .domain([1,2,3,4,5,6,7,8,9,10,11,12].reverse())
                   .range([height, 0]);
  
  const yAxis = d3.axisLeft(yScale)
                  .tickFormat((item) => d3.timeFormat("%B")(d3.timeParse("%m")(item)))
                  .tickSizeOuter(0)
  
  chart.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(-1, 0)`)
      .call(yAxis);
              
  
  const baseTemp = dataset.baseTemperature;
  const temps = dataset.monthlyVariance.map(item => {
    return baseTemp + item.variance;
  })

  const color = d3.scaleLinear()
                  .domain([d3.min(temps), baseTemp, d3.max(temps)])
                  .range(["blue", "yellow", "red"])
  
                      
  const tooltip = element.append("div")
                         .attr("id", "tooltip")
                         .style("position", "absolute")
                         .style("color", "white")
                         .style("background-color", "rgba(100, 100, 100, 0.75)")
                         .style("opacity", 0)
                         .style("pointer-events", "none")
                         .style("border-radius", "5px")
                         .style("padding", "5px")
                         .style("font-size", "12px")
                        

  
  chart.selectAll("rect")
       .data(dataset.monthlyVariance)
       .enter()
       .append("rect")
       .attr("class", "cell")
       .attr("x", (d, i) => xScale(d.year))
       .attr("y", (d, i) => yScale(d.month))
       .attr("width", xScale.bandwidth())
       .attr("height", yScale.bandwidth())
       .style("fill", (d, i) => color(d.variance + baseTemp))
       .attr("data-month", (d, i) => (d.month - 1))
       .attr("data-year", (d, i) => (d.year))
       .attr("data-temp", (d, i) => (d.variance + baseTemp))
       .on("mouseover", (event, d) => {
           
           
           console.log(event.currentTarget)
           tooltip
            .attr("data-year", d.year)
            .html(`<div>${d3.timeFormat("%B")(d3.timeParse("%m")(d.month))}, ${d.year}</div>
                   <div>Temp: ${(baseTemp + d.variance).toFixed(2)} °C</div>
                   <div>Variance: ${d.variance.toFixed(2)} °C</div>
                  `)
            .style("top", event.clientY - 60 + "px")
            .style("left", event.clientX + 10 + "px")
            .style("opacity", 1)
           
           
        })
        .on("mouseout", (event, d) => {
        
    
            tooltip.style("opacity", "0")
    
        })
  
  
    const legend = d3.legendColor()
                         .shapeWidth(30)
                         .cells(10)
                         .orient("horizontal")
                         .scale(color)
  
    chart.append("g")
         .attr("id", "legend")
         .style("font-size", "12px")
         .attr("transform", "translate(0, 560)")
         .call(legend)

  

})