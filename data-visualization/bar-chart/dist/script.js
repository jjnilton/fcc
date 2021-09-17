const element = document.getElementById('d3');

const width = 600;
const height = 400;
const padding = 60;
const margin = 50;
// const barWidth = width / dataset.length; 


let json = {};

d3.json('https://raw.githubusercontent.com/jjnilton/freecodecamp-projects/main/data-visualization/bar-chart/data/GDP-data.json')
  .then((data) => {
    json = data;
    init();
  });

const init = () => {
  const dataset = json;
  
  // convert date string to date objects
  let yearsDate = dataset.data.map((item) => {
    return new Date(item[0]);
  });

  // new object, so it doesn't mess the dataset
  let xMax = new Date(d3.max(yearsDate));
  xMax.setMonth(xMax.getMonth() + 6);
  
  const xScale = d3
    .scaleTime()
    .domain([d3.min(yearsDate), xMax])
    .range([60, width - 60])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset.data, (d) => d[1])])
    .range([height - 60, padding])

  const chart = d3.select(element)
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
  
  const svg = d3.select("svg")
                .append("defs")
                  .append("linearGradient")
                    .attr('id', 'gradient')
                    .attr("x1", "0%")
                    .attr("x2", "100%")
                    .attr("y1", "0%")
                    .attr("y2", "100%")
  
  svg.append("stop")
     .attr("offset", "0%")
     .attr("style", "stop-color:blue;stop-opacity:1")
                 
    
  svg.append("stop")
     .attr("offset", "100%")
     .attr("style", "stop-color:red;stop-opacity:1")
  
  
  
   chart.append("text")
      .attr("x", -235)
      .attr("y", 80)
      .text("Gross Domestic Product")
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .style("font-family", "sans-serif")
                
  
  // returns quarter from dateString YYYY-mm-dd  
  let getQuarterFromDateString = (dateString) => {
  
    const month = dateString.split("-")[1];
    
    return Math.ceil(month/3);
    
  }

  const overlay = d3.select(element)
                    .append("div")
                    .style("background-color", "white")
                    .style("position", "absolute")
                    .style("opacity", "0")
                    .style("pointer-events", "none")
                    .style("box-shadow", "0px 0px 2px white")
                    
  
  const tooltip = d3.select(element)
                    .append("div")
                    .attr("id", "tooltip")
                    .style("position", "absolute")
                    .style("background-color", "rgba(0,0,50,.5)")
                    .style("width", "100px")
                    .style("text-align", "center")
                    .style("color", "white")
                    .style("text-shadow", "0px 0px 2px black")
                    .style("font-family", "sans-serif")
                    .style("font-size", "12px")
                    .style("opacity", "0")
                    .style("pointer-events", "none")
                    .style("padding", "5px")
  
  
  chart.selectAll("rect")
        .data(dataset.data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => xScale(yearsDate[i]))
        .attr("y", (d, i) => yScale(d[1]))
        .attr("width", width / dataset.data.length)
        .attr("height", (d, i) => yScale(0) - yScale(d[1]))
        .attr("fill", "url(#gradient)")
        .attr("data-date", (d, i) => d[0])
        .attr("data-gdp", (d, i) => d[1])
        .on("mouseover", (event, d) => {
    
          let index = (d3.selectAll("rect").nodes().indexOf(event.currentTarget))
          let diff = event.clientX - d3.selectAll("rect").nodes()[index].attributes.x.nodeValue;
          overlay
            .style("opacity", "1")
            .style("width", width / dataset.data.length + "px")
            .style("height", yScale(0) - yScale(d[1]) + 2 + "px")
            .style("top", event.currentTarget.getBoundingClientRect().top - 2 + "px")
            .style("left", parseFloat(d3.selectAll("rect").nodes()[index].attributes.x.nodeValue) + diff + "px");

          tooltip
            .html(`<div>Q${getQuarterFromDateString(d[0])} ${d[0].split("-")[0]}</div><div>US$ ${d[1].toFixed(0).replace(/(\d+)(?=(\d{3})+)/g, "$1,")} Billion</div>`)
            .transition().duration(200)
            .style("top", `${event.clientY - 45}px`)
            .style("left", `${index > dataset.data.length / 2 ? event.clientX - 120 : event.clientX + 10}px`)
            .style("opacity", "1")
            .attr("data-date", d[0]);
            
        })
        .on("mousemove", (event, d) => {
          let index = (d3.selectAll("rect").nodes().indexOf(event.currentTarget))
          overlay
            .transition().duration(200).style("opacity", "1")      
    
          tooltip
            .style("top", `${event.clientY - 45}px`)
            .style("left", `${index > dataset.data.length / 2 ? event.clientX - 120 : event.clientX + 10}px`);
         })
        .on("mouseout", (event, d) => {
          
          overlay
            .transition().duration(200).style("opacity", "0")
          
          tooltip
            .transition()
            .duration(200)
            .style("opacity", "0");
    
        })
        

  const xAxis = d3.axisBottom(xScale);
  chart.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height - padding})`)
        .call(xAxis)

  const yAxis = d3.axisLeft(yScale);
  chart.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(60, 0)`)
        .call(yAxis)
}