
let regionVar = 'Americas'

const options = ['Americas', 'East Asia & Pacific', 'Europe & Central Asia', 'Middle East & North Africa', 'South Asia', 'Sub-Saharan Africa'];

function dropdown() {
    d3.selectAll('.variable')
    .each(function() {
            d3.select(this).selectAll('myOptions')
            .data(options)
            .enter()
            .append('option')
            .text(d => d)
            .attr("value",d => d) 
    })

}

function createVisual (data) {

    const width = 1000;
    const height = 700;
    const radius = 500 / 2;
    const innerRadius = 168;

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, 2 * Math.PI])
      .align(0);
  
    const arc = d3.arc()
        .innerRadius(radius * 0.67)
        .outerRadius(radius - 1);
  
    const pie = d3.pie()
        .padAngle(1 / radius)
        .sort(null)
        .value(5);
  
    const svg = d3.select("#vis")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
        svg.append("g")
        .selectAll()
        .data(pie(data))
        .join("path")
            .attr("fill", "white")
            .attr("d", arc)
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .style('fill', '#dddddd');
            }).on('mouseout', function (event, d) {
                d3.select(this)
                    .style('fill', "white");
            });
  

        svg.append("g")
          .selectAll()
          .data(x.domain())
          .join("g")
            .attr("transform", d => `
              rotate(${((x(d) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
              translate(${innerRadius},0)
            `)
            .call(g => g.append("line")
                .attr("x2", 100)
                .attr("stroke", "#000"))
            .call(g => g.append("text")
                .attr("transform", d => (x(d) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                    ? "rotate(10)translate(0,16)"
                    : "rotate(0)translate(0,20)")
                .text(d => d));


        svg.append("g")
            .append("text")
            .attr("text-anchor", "middle")
            .attr("y", "30")
            .text("of metrics are stronger than the");

        svg.append("g")
           .append("text")
           .attr("text-anchor", "middle")
           .attr("y", "50")
           .text("average of other Regions");
}


function init() {
    d3.csv("data/population-by-age.csv")
    .then(data => {
        console.log(data);
        createVisual(data);
        dropdown();
    });
}

window.addEventListener('load', init);