// pctDrive

//asynchronous tasks,

d3.queue()
	.defer(d3.topojson,"Data/map.topojson")
	.await(ready);

// callback

function ready(error, Data) {
	
	if(error) throw error;
	
	//atlanta
	var atlanta = topojson.feature(data, {
		type: "GeometryCollection",
		geometries: data.objects.collection.geometries
	});
	
	//prjection
	var projection = d3.geoAlbersUsa()
		.fitExtent([[20,20], [460, 580] ], atlanta)
	
	// path
	var geoPath = d3.geoPath()
		.projection(projection);
	
	//draw map
	d3.select("svg.atlanta").selectAll("path")
		.data(atlanta.features)
		.enter()
		.append("path")
		.attr("d", geoPath)
		.attr("fill", green);
	
}