const edu_file = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
const counties_file = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"

const element = d3.select("#d3");

const margin = {top: 30, left: 30, bottom: 30, right: 30};
const width = 1000 - margin.right - margin.left;
const height = 800 - margin.top - margin.right;

const chart = element.append("svg")
                     .attr("width", width)
                     .attr("height", height)


const path = d3.geoPath()

const tooltip = element.append("div")
                       .attr("id", "tooltip")
                       .style("position", "absolute")
                       .style("pointer-events", "none")
                       .style("background-color", "rgba(250, 250, 200, 0.75)")
                       .style("padding", "5px")
                       .style("border-radius", "5px")
                       .style("opacity", "0")

Promise.all([
  d3.json(edu_file),
  d3.json(counties_file)
]).then(files => {
  // console.log(files)
  const us = files[1];
  const education = files[0];
  
  const getEduFromFips = (fips) => {
    return education.filter((item) => item.fips === fips)[0]
  }
  
  console.log(getEduFromFips(1001))
  
  const bachelorsOrHigher = education.map(item => item.bachelorsOrHigher)
  
  console.log(d3.min(bachelorsOrHigher))
  console.log(d3.max(bachelorsOrHigher))

  const color = d3
                .scaleThreshold()
                .domain(d3.range(1 + 2.6, 75.1, (75.1 - 2.6) / 8))
                .range(d3.schemeBlues[8])
  
  const legend = d3.legendColor()
                   .labels(d3.legendHelpers.thresholdLabels)
                   .scale(color)
  
  chart.append("g")
       .attr("id", "legend")
       .attr("transform", "translate(830, 400)")
       .style("font-size", "12px")
       .call(legend)
  
  chart.append("g")
       .attr("class", "counties")
       .selectAll("path")
       .data(topojson.feature(us, us.objects.counties).features)
       .enter()
       .append("path")
       .attr("class", "county")
       .attr("data-fips", (d, i) => d.id)
       .attr("data-education", (d, i) => {
          if (getEduFromFips(d.id).fips === d.id) {
            return getEduFromFips(d.id).bachelorsOrHigher;
          }
          return 0;
        })
       .attr("fill", (d, i) => {
          if (getEduFromFips(d.id).fips === d.id) {
            return color(getEduFromFips(d.id).bachelorsOrHigher);
          }
        return color(0);
       })
       .attr("d", path)
       .on("mouseover", (event, d) => {
        const eduObj = getEduFromFips(d.id);
        const county = eduObj.area_name;
        const state = eduObj.state;
        const value = eduObj.bachelorsOrHigher;
        tooltip
          .attr("data-education", value)
          .html(`<div>${county}, ${state}, ${value}%</div>`)
          .style("left", event.clientX + 10 + "px")
          .style("top", event.clientY - 30 + "px")
          .style("opacity", "1")
       })
      .on("mouseout", (event, d) => {
        tooltip
          .style("opacity", "0")
      })
})