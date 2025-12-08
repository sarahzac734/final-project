function createVisual (data) {
    const width = 975;
    const height = 610;

    const svg = d3.select("#vis").append("svg")
        .attr("viewBox", [0, 0, width + 100, height + 100])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");

    const g = svg.append("g");




}




async function init() {
    try {
        let us = await d3.json("./data/states-albers-10m.json");

        console.log('Data:', us);

        createVisual(us);

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

window.addEventListener('load', init);