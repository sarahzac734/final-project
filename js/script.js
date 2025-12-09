function createVisual (data) {

    const width = 1000;
    const height = 800;
    const innerRadius = 168;

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, 2 * Math.PI])
      .align(0);
  
    const svg = d3.select("#vis")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
        svg.append("g")
          .selectAll()
          .data(x.domain())
          .join("g")
            .attr("transform", d => `
              rotate(${((x(d) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
              translate(${innerRadius},0)
            `)
            .call(g => g.append("line")
                .attr("x2", 190)
                .attr("stroke", "#000"))
            .call(g => g.append("text")
                .attr("transform", d => (x(d) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                    ? "rotate(10)translate(0,16)"
                    : "rotate(0)translate(0,20)")
                .text(d => d));
}


function init() {
    d3.csv("data/population-by-age.csv")
    .then(data => {
        console.log(data);
        createVisual(data);
    });
}

window.addEventListener('load', init);