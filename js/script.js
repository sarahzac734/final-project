const metricsConfig = [
    { id: "GDP_per_capita", label: "GDP per capita (PPP)", higherBetter: true, format: d3.format(",.0f") },
    { id: "Health_per_capita", label: "Health spend per person", higherBetter: true, format: d3.format(",.0f") },
    { id: "Electricity_access", label: "Electricity access (%)", higherBetter: true, format: d3.format(".1f") },
    { id: "Infant_mortality", label: "Infant mortality (per 1k)", higherBetter: false, format: d3.format(".1f") },
    { id: "Extreme_poverty", label: "Extreme poverty (%)", higherBetter: false, format: d3.format(".1f") },
    { id: "CO2_per_capita", label: "CO2 per capita (t)", higherBetter: false, format: d3.format(".2f") },
    { id: "Happy_planet", label: "Happy planet score", higherBetter: true, format: d3.format(".1f") },
    { id: "Human_development_index", label: "Human development index", higherBetter: true, format: d3.format(".3f") },
    { id: "Education_spend_pct_GDP", label: "Education spend % GDP", higherBetter: true, format: d3.format(".2f") },
    { id: "Unemployment", label: "Unemployment (%)", higherBetter: false, format: d3.format(".1f") },
    { id: "Government_effectiveness", label: "Government effectiveness", higherBetter: true, format: d3.format("+.2f") },
    { id: "Control_of_corruption", label: "Control of corruption", higherBetter: true, format: d3.format("+.2f") }
];

const isoRegionMap = {
    "AFG": "Middle East & North Africa",
    "ALB": "Europe & Central Asia",
    "DZA": "Middle East & North Africa",
    "AGO": "Sub-Saharan Africa",
    "ARG": "Americas",
    "ARM": "Europe & Central Asia",
    "AUS": "East Asia & Pacific",
    "AUT": "Europe & Central Asia",
    "AZE": "Europe & Central Asia",
    "BHS": "Americas",
    "BHR": "Middle East & North Africa",
    "BGD": "South Asia",
    "BRB": "Americas",
    "BLR": "Europe & Central Asia",
    "BEL": "Europe & Central Asia",
    "BLZ": "Americas",
    "BEN": "Sub-Saharan Africa",
    "BTN": "South Asia",
    "BOL": "Americas",
    "BIH": "Europe & Central Asia",
    "BWA": "Sub-Saharan Africa",
    "BRA": "Americas",
    "BRN": "East Asia & Pacific",
    "BGR": "Europe & Central Asia",
    "BFA": "Sub-Saharan Africa",
    "BDI": "Sub-Saharan Africa",
    "CPV": "Sub-Saharan Africa",
    "KHM": "East Asia & Pacific",
    "CMR": "Sub-Saharan Africa",
    "CAN": "Americas",
    "CAF": "Sub-Saharan Africa",
    "TCD": "Sub-Saharan Africa",
    "CHL": "Americas",
    "CHN": "East Asia & Pacific",
    "COL": "Americas",
    "COM": "Sub-Saharan Africa",
    "COD": "Sub-Saharan Africa",
    "COG": "Sub-Saharan Africa",
    "CRI": "Americas",
    "CIV": "Sub-Saharan Africa",
    "HRV": "Europe & Central Asia",
    "CUB": "Americas",
    "CYP": "Europe & Central Asia",
    "CZE": "Europe & Central Asia",
    "DNK": "Europe & Central Asia",
    "DJI": "Middle East & North Africa",
    "DOM": "Americas",
    "ECU": "Americas",
    "EGY": "Middle East & North Africa",
    "SLV": "Americas",
    "GNQ": "Sub-Saharan Africa",
    "ERI": "Sub-Saharan Africa",
    "EST": "Europe & Central Asia",
    "SWZ": "Sub-Saharan Africa",
    "ETH": "Sub-Saharan Africa",
    "FJI": "East Asia & Pacific",
    "FIN": "Europe & Central Asia",
    "FRA": "Europe & Central Asia",
    "GAB": "Sub-Saharan Africa",
    "GMB": "Sub-Saharan Africa",
    "GEO": "Europe & Central Asia",
    "DEU": "Europe & Central Asia",
    "GHA": "Sub-Saharan Africa",
    "GRC": "Europe & Central Asia",
    "GTM": "Americas",
    "GIN": "Sub-Saharan Africa",
    "GNB": "Sub-Saharan Africa",
    "GUY": "Americas",
    "HTI": "Americas",
    "HND": "Americas",
    "HUN": "Europe & Central Asia",
    "ISL": "Europe & Central Asia",
    "IND": "South Asia",
    "IDN": "East Asia & Pacific",
    "IRN": "Middle East & North Africa",
    "IRQ": "Middle East & North Africa",
    "IRL": "Europe & Central Asia",
    "ISR": "Middle East & North Africa",
    "ITA": "Europe & Central Asia",
    "JAM": "Americas",
    "JPN": "East Asia & Pacific",
    "JOR": "Middle East & North Africa",
    "KAZ": "Europe & Central Asia",
    "KEN": "Sub-Saharan Africa",
    "PRK": "East Asia & Pacific",
    "KOR": "East Asia & Pacific",
    "KWT": "Middle East & North Africa",
    "KGZ": "Europe & Central Asia",
    "LAO": "East Asia & Pacific",
    "LVA": "Europe & Central Asia",
    "LBN": "Middle East & North Africa",
    "LSO": "Sub-Saharan Africa",
    "LBR": "Sub-Saharan Africa",
    "LBY": "Middle East & North Africa",
    "LTU": "Europe & Central Asia",
    "LUX": "Europe & Central Asia",
    "MKD": "Europe & Central Asia",
    "MDG": "Sub-Saharan Africa",
    "MWI": "Sub-Saharan Africa",
    "MYS": "East Asia & Pacific",
    "MDV": "South Asia",
    "MLI": "Sub-Saharan Africa",
    "MLT": "Middle East & North Africa",
    "MRT": "Sub-Saharan Africa",
    "MUS": "Sub-Saharan Africa",
    "MEX": "Americas",
    "MDA": "Europe & Central Asia",
    "MNG": "East Asia & Pacific",
    "MNE": "Europe & Central Asia",
    "MAR": "Middle East & North Africa",
    "MOZ": "Sub-Saharan Africa",
    "MMR": "East Asia & Pacific",
    "NAM": "Sub-Saharan Africa",
    "NPL": "South Asia",
    "NLD": "Europe & Central Asia",
    "NZL": "East Asia & Pacific",
    "NIC": "Americas",
    "NER": "Sub-Saharan Africa",
    "NGA": "Sub-Saharan Africa",
    "NOR": "Europe & Central Asia",
    "OMN": "Middle East & North Africa",
    "PAK": "Middle East & North Africa",
    "PAN": "Americas",
    "PNG": "East Asia & Pacific",
    "PRY": "Americas",
    "PER": "Americas",
    "PHL": "East Asia & Pacific",
    "POL": "Europe & Central Asia",
    "PRT": "Europe & Central Asia",
    "QAT": "Middle East & North Africa",
    "ROU": "Europe & Central Asia",
    "RUS": "Europe & Central Asia",
    "RWA": "Sub-Saharan Africa",
    "SAU": "Middle East & North Africa",
    "SEN": "Sub-Saharan Africa",
    "SRB": "Europe & Central Asia",
    "SLE": "Sub-Saharan Africa",
    "SGP": "East Asia & Pacific",
    "SVK": "Europe & Central Asia",
    "SVN": "Europe & Central Asia",
    "SLB": "East Asia & Pacific",
    "SOM": "Sub-Saharan Africa",
    "ZAF": "Sub-Saharan Africa",
    "SSD": "Sub-Saharan Africa",
    "ESP": "Europe & Central Asia",
    "LKA": "South Asia",
    "SDN": "Sub-Saharan Africa",
    "SUR": "Americas",
    "SWE": "Europe & Central Asia",
    "CHE": "Europe & Central Asia",
    "SYR": "Middle East & North Africa",
    "TWN": "East Asia & Pacific",
    "TJK": "Europe & Central Asia",
    "TZA": "Sub-Saharan Africa",
    "THA": "East Asia & Pacific",
    "TLS": "East Asia & Pacific",
    "TGO": "Sub-Saharan Africa",
    "TTO": "Americas",
    "TUN": "Middle East & North Africa",
    "TUR": "Europe & Central Asia",
    "TKM": "Europe & Central Asia",
    "UGA": "Sub-Saharan Africa",
    "UKR": "Europe & Central Asia",
    "ARE": "Middle East & North Africa",
    "GBR": "Europe & Central Asia",
    "USA": "Americas",
    "URY": "Americas",
    "UZB": "Europe & Central Asia",
    "VEN": "Americas",
    "VNM": "East Asia & Pacific",
    "YEM": "Middle East & North Africa",
    "ZMB": "Sub-Saharan Africa",
    "ZWE": "Sub-Saharan Africa"
};

const toXY = (angle, r) => [Math.cos(angle) * r, Math.sin(angle) * r];
const formatValue = (metric, value) => (typeof metric.format === "function" ? metric.format(value) : value);

function createVisual(data) {
    const width = 900;
    const height = 900;
    const radius = Math.min(width, height) / 2 - 70;
    const innerRadius = 120;
    const startAngle = -Math.PI / 2;

    const svg = d3.select("#vis").append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const wedgeLayer = svg.append("g");
    const axisLayer = svg.append("g");
    const dotLayer = svg.append("g");
    const labelLayer = svg.append("g");
    const arcLayer = svg.append("g");
    const centerLayer = svg.append("g");

    const tooltip = d3.select("#tooltip");

    const regions = data.map(d => d.Region);
    const regionIndex = new Map(regions.map((r, i) => [r, i]));
    const regionData = new Map(data.map(d => [d.Region, d]));

    const metricExtents = metricsConfig.reduce((acc, metric) => {
        const values = data
            .map(d => +d[metric.id])
            .filter(v => Number.isFinite(v));
        acc[metric.id] = {
            min: values.length ? d3.min(values) : 0,
            max: values.length ? d3.max(values) : 1
        };
        return acc;
    }, {});

    const regionSelect = d3.select("#region-select");
    regionSelect.selectAll("option")
        .data(regions)
        .join("option")
        .attr("value", d => d)
        .text(d => d);

    const wedgeArc = d3.arc()
        .innerRadius(innerRadius - 24)
        .outerRadius(radius + 22);

    const highlightArc = d3.arc()
        .innerRadius(radius + 8)
        .outerRadius(radius + 18);

    const valueToRadius = (metricId, value) => {
        const { min, max } = metricExtents[metricId];
        if (!Number.isFinite(min) || !Number.isFinite(max) || max - min === 0) return (innerRadius + radius) / 2;
        const norm = (value - min) / (max - min);
        return innerRadius + norm * (radius - innerRadius);
    };

    const percentText = centerLayer.append("text")
        .attr("class", "center-value")
        .attr("y", -4);

    const subText = centerLayer.append("text")
        .attr("class", "center-subtext")
        .attr("y", 18)
        .text("of metrics (with data) are stronger than other regions");

    const arcPath = arcLayer.append("path")
        .attr("class", "arc-highlight");

    function isStronger(metric, selectedRegion) {
        const selectedVal = +regionData.get(selectedRegion)[metric.id];
        const others = regions
            .filter(r => r !== selectedRegion)
            .map(r => +regionData.get(r)[metric.id])
            .filter(v => Number.isFinite(v));
        if (!Number.isFinite(selectedVal) || others.length === 0) return null;
        const avgOthers = d3.mean(others);
        if (metric.higherBetter) return selectedVal >= avgOthers;
        return selectedVal <= avgOthers;
    }

    function orderMetrics(selectedRegion) {
        const strong = [];
        const weak = [];
        const missing = [];
        metricsConfig.forEach(metric => {
            const res = isStronger(metric, selectedRegion);
            if (res === null) missing.push(metric);
            else if (res) strong.push(metric);
            else weak.push(metric);
        });
        return { order: [...strong, ...weak, ...missing], strongCount: strong.length, totalConsidered: strong.length + weak.length };
    }

    function update(selectedRegion) {
        regionSelect.property("value", selectedRegion);
        const { order, strongCount, totalConsidered } = orderMetrics(selectedRegion);

        const angleScale = d3.scaleLinear()
            .domain([0, order.length])
            .range([startAngle, startAngle + Math.PI * 2]);

        const transition = svg.transition().duration(750);

        const wedges = wedgeLayer.selectAll("path")
            .data(order, d => d.id);

        wedges.join(
            enter => enter.append("path")
                .attr("class", "metric-wedge")
                .on("mouseenter", (event, d) => {
                    d3.select(event.currentTarget).classed("active", true);
                })
                .on("mouseleave", (event) => {
                    d3.select(event.currentTarget).classed("active", false);
                })
        ).transition(transition)
            .attr("d", (d, i) => wedgeArc({
                startAngle: angleScale(i),
                endAngle: angleScale(i + 1)
            }));

        const axes = axisLayer.selectAll("line")
            .data(order, d => d.id);

        axes.join(
            enter => enter.append("line")
                .attr("class", "axis-line")
        ).transition(transition)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => toXY(angleScale(i), radius)[0])
            .attr("y2", (d, i) => toXY(angleScale(i), radius)[1]);

        const labels = labelLayer.selectAll("text")
            .data(order, d => d.id);

        labels.join(
            enter => enter.append("text")
                .attr("class", "metric-label")
                .text(d => d.label)
        ).transition(transition)
            .attr("transform", (d, i) => {
                const angle = angleScale(i);
                const [x, y] = toXY(angle, radius + 32);
                let rotation = (angle * 180 / Math.PI) + 90;
                if (rotation > 90 && rotation < 270) rotation += 180;
                return `translate(${x},${y}) rotate(${rotation})`;
            });

        const dotData = order.flatMap((metric, metricIndex) =>
            regions.map(region => ({
                metric,
                metricIndex,
                region,
                value: +regionData.get(region)[metric.id]
            }))
        ).filter(d => Number.isFinite(d.value));

        const jitterAngle = (region) => (regionIndex.get(region) - (regions.length - 1) / 2) * 0.008;
        const jitterRadius = (region) => (regionIndex.get(region) - (regions.length - 1) / 2) * 3;

        const dots = dotLayer.selectAll("circle")
            .data(dotData, d => `${d.metric.id}-${d.region}`);

        dots.join(
            enter => enter.append("circle")
                .attr("class", "dot")
                .attr("r", d => d.region === selectedRegion ? 8 : 5)
                .on("mouseenter", (event, d) => {
                    const metric = d.metric;
                    const cleanLabel = metric.label.replace(/\s*\(.*?\)/, "").trim();
                    let valStr = formatValue(metric, d.value);
                    if (metric.label.includes("(%)") || metric.label.includes("pct")) {
                        if (!valStr.includes("%")) valStr += "%";
                    }

                    tooltip
                        .style("display", "block")
                        .style("left", `${event.pageX + 20}px`)
                        .style("top", `${event.pageY - 20}px`)
                        .html(`<div class="tooltip-content">
                                <div class="tooltip-value">${valStr}</div>
                                <div class="tooltip-info">
                                    <div class="tooltip-row">
                                        <span class="tooltip-label">METRIC:</span> <span class="tooltip-data">${cleanLabel}</span>
                                    </div>
                                    <div class="tooltip-row">
                                        <span class="tooltip-label">REGION:</span> <span class="tooltip-data">${d.region}</span>
                                    </div>
                                </div>
                               </div>`);
                })
                .on("mousemove", (event) => {
                    tooltip
                        .style("left", `${event.pageX + 20}px`)
                        .style("top", `${event.pageY - 20}px`);
                })
                .on("mouseleave", () => {
                    tooltip.style("display", "none");
                })
        )
            .classed("selected-dot", d => d.region === selectedRegion)
            .transition(transition)
            .attr("r", d => d.region === selectedRegion ? 8 : 5)
            .attr("cx", d => {
                const angle = angleScale(d.metricIndex) + jitterAngle(d.region);
                const r = valueToRadius(d.metric.id, d.value) + jitterRadius(d.region);
                return toXY(angle, r)[0];
            })
            .attr("cy", d => {
                const angle = angleScale(d.metricIndex) + jitterAngle(d.region);
                const r = valueToRadius(d.metric.id, d.value) + jitterRadius(d.region);
                return toXY(angle, r)[1];
            })
            .attr("fill", d => d.region === selectedRegion ? "var(--purple)" : "#c7c7d1");

        const denom = totalConsidered || metricsConfig.length;
        const percent = Math.round((strongCount / denom) * 100);
        percentText.text(`${percent}%`);

        const arcPathData = strongCount > 0 ? highlightArc({
            startAngle: angleScale(0),
            endAngle: angleScale(strongCount)
        }) : null;

        arcPath.transition(transition)
            .attr("d", arcPathData)
            .style("opacity", strongCount > 0 ? 1 : 0);
    }

    regionSelect.on("change", (event) => update(event.target.value));

    update(regions[0]);
}

function pickNumber(row, cols) {
    for (let i = cols.length - 1; i >= 0; i--) {
        const idx = cols[i];
        const val = row[idx];
        if (val === null || val === undefined || val === "-" || val === "...") continue;
        const num = Number(String(val).replace(/,/g, ""));
        if (!Number.isNaN(num)) return num;
    }
    return null;
}

function aggregateFromWorkbook(sheetRows) {
    const dataStartIndex = 5;

    const metricColumns = [
        ["GDP_per_capita", [18, 19, 20, 21]],
        ["Health_per_capita", [34, 35, 36]],
        ["Electricity_access", [51]],
        ["Infant_mortality", [37]],
        ["Extreme_poverty", [50]],
        ["CO2_per_capita", [77]],
        ["Happy_planet", [7, 6]],
        ["Human_development_index", [9, 8]],
        ["Education_spend_pct_GDP", [42, 41, 40]],
        ["Unemployment", [49, 48]],
        ["Government_effectiveness", [60, 59]],
        ["Control_of_corruption", [66, 65]]
    ];

    const agg = new Map();

    sheetRows.slice(dataStartIndex).forEach(row => {
        const country = row[0];
        const iso = row[1];
        if (!country || !iso || iso === "-") return;

        const isoStr = String(iso).trim();
        const bucket = isoRegionMap[isoStr] || (isoStr === "TWN" ? "East Asia & Pacific" : null);
        if (!bucket) return;

        if (!agg.has(bucket)) {
            agg.set(bucket, {});
        }
        const bucketMetrics = agg.get(bucket);

        metricColumns.forEach(([id, cols]) => {
            const val = pickNumber(row, cols);
            if (val !== null && Number.isFinite(val)) {
                if (!bucketMetrics[id]) bucketMetrics[id] = [];
                bucketMetrics[id].push(val);
            }
        });
    });

    const regions = Array.from(agg.keys()).sort();
    return regions.map(region => {
        const metrics = agg.get(region);
        const obj = { Region: region };
        metricColumns.forEach(([id]) => {
            const vals = metrics[id] || [];
            obj[id] = vals.length ? d3.mean(vals) : null;
        });
        return obj;
    });
}

async function init() {
    try {
        const workbookBuffer = await fetch("./data/assignment 3 & 4 dataset (1).xlsx").then(res => res.arrayBuffer());
        const workbook = XLSX.read(workbookBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetRows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: true });

        const aggregated = aggregateFromWorkbook(sheetRows);
        createVisual(aggregated);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

window.addEventListener("load", init);
