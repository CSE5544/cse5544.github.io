async function program() {

    //step 1: load the dataset
    //data source: https://github.com/codeforgermany/click_that_hood/blob/master/public/data/columbus.geojson
    var data = await d3.json("columbus.geojson");
    console.log(data);

    //step 2: create the SVG 
    var width = 600,
        height = 600;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geoMercator()
        .scale(50000)
        .center([-82.98, 39.98])
        .translate([width / 2, height / 2]);

    var geoGenerator = d3.geoPath()
        .projection(projection);

    var colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([1,30]);

    var map = svg.append("g")
        .selectAll('path')
        .data(data.features)
        .join("path")
        .attr("d", function(d){
           console.log(d);
           return geoGenerator(d); 
        })
        .attr("stroke", "#aaa")
        .attr("fill", function(d){
            return colorScale(d.properties.name.length);
        })

    var points = svg.append("g")
        .selectAll("dot")
        .data(data.features)
        .join("circle")
        .attr("cx", function(d,i){
            return geoGenerator.centroid(d)[0];
        })
        .attr("cy", function(d,i){
            return geoGenerator.centroid(d)[1];
        })
        .attr("r", 4)
        .attr("fill", "red");

    




}



program();