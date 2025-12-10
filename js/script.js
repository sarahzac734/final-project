
let regionVar = 'Americas'
let theData = [];

const options = ['Americas', 'East Asia & Pacific', 'Europe & Central Asia', 'Middle East & North Africa', 'South Asia', 'Sub-Saharan Africa'];

const metrics = ['sustainable_economic_development_assessment', 'GDP', 'health_expenditure_per_person', 'unemployment', 'political_rights_score', 'civil_liberties_score', 'judicial_effectiveness_score', 'government_integrity_score', 'financial_freedom_score', 'government_expenditure', 'seats_held_by_women' ];
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

    d3.select('#region').property("value", regionVar);

}

function createVisual (data) {
    const width = 1500;
    const height = 1000;
    const radius = 500 / 2;
    const innerRadius = 168;

    const xScale = d3.scaleLinear()
    .domain([0, 20])
    .range([0, radius])

const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([radius - 250, 0]);

    const x = d3.scaleBand()
      .domain(metrics.map(d => d))
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
        .data(pie(metrics))
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
                .attr("x2", 200)
                .attr("stroke", "#000"))
            .each(function(d) {
                let newData = data.filter( x=> x.metric === d);
                d3.select(this)
                .selectAll("circle")
                .data(newData)
                .join("circle")
                  .attr("r", 5)
                  .attr('cx', d => xScale(d.value) / 100)
                  .attr('cy', d => yScale(d.value) / 100)
                  .style('stroke', 'grey')
                 .style('fill', 'white')
                                    .on('mouseover', function(event,y) {
                                        d3.select('#tooltip')
                                                        .style("display", 'block')
                                                        .html(
                                                            `Metric: ${y.metric}<br/>
                                                            Region: ${y.region}<br>
                                                            ${y.value}`)
                                                        .style("left", (event.pageX + 20) + "px")
                                                        .style("top", (event.pageY - 28) + "px");
                                    }).on('mouseout', function (event, d) {
                                        d3.select('#tooltip')
                                            .style('display', 'none');
                                    });

            })
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
    d3.csv("data/data_final.csv", function(d) {
        return {
            metric: d.Metric,
            region: d.region,
            value: +d.Value
           
        }
    })
    .then(data => {
        theData = data;
        console.log(data);
        dropdown();
        createVisual(data);
    });
}

window.addEventListener('load', init);