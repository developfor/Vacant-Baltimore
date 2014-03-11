var vbFuction = function(){

	 map = new L.map('map').setView([39.297352225099999, -76.633165957100005], 16);

	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	var list = geojsonFeature
	var locArray = [];

	list.forEach(function(entry) {
			// console.log(entry["coordinates"])
			var marker = new L.marker(entry["coordinates"].reverse(), { title: entry["fullAddress"], lat: entry["coordinates"][0], log: entry["coordinates"][1], noticeDate: entry["noticeDate"]}).addTo(map)
			.bindPopup(entry["fullAddress"]);
			marker.on('click', function(){
				$(".sub-subtitle").html(entry["fullAddress"]+ "<br>"+entry["coordinates"] );
				console.log(entry["fullAddress"]);
				console.log(this.options)
				// var imgLocation = "<div class='location-pic'><img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.latitude+","+this.options.longitude+"&fov=90&heading=225&pitch=10&sensor=false'></div> ";

				var imgLocation = "<div class='location-pic'><img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.lat+","+this.options.log+"&fov=90&heading=225&pitch=10&sensor=false'></div> ";


            	$("#intro_text").html(imgLocation);

			});

			locArray.push(marker);
		});


	map.on("dragend", function(){	

		var lat = map.getCenter()["lat"]
		var log =  map.getCenter()["lng"]


		locArray.forEach(function(entry) {
			map.removeLayer(entry);
		});
		$.getJSON('/search.json?utf8=%E2%9C%93&vacant_building%5Blat%5D='+log+'&vacant_building%5Blog%5D='+ lat, function(result) {
			geojsonFeature = result;
			result.forEach(function(entry) {
				var marker = new L.marker(entry["coordinates"].reverse(), { title: entry["fullAddress"], lat: entry["coordinates"][0], log: entry["coordinates"][1], noticeDate: entry["noticeDate"]}).addTo(map)
				.bindPopup(entry["fullAddress"]);
				marker.on('click', function(){console.log(entry["fullAddress"])
					$(".sub-subtitle").html(entry["fullAddress"]+ "<br>"+entry["noticeDate"]);
					var imgLocation = "<div class='location-pic'><img src='http://maps.googleapis.com/maps/api/streetview?size=250x120&location="+this.options.lat+","+this.options.log+"&fov=90&heading=225&pitch=10&sensor=false'></div> ";
            		$("#intro_text").html(imgLocation);

			});

				locArray.push(marker);

			});
		});
		
	});


}

var geojsonFeature;


$.getJSON('/search.json?utf8=%E2%9C%93&vacant_building%5Blat%5D=-76.6331659571&vacant_building%5Blog%5D=39.2973522251', function(result) {
	geojsonFeature = result;
	vbFuction();
});


