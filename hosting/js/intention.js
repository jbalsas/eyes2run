var marker;
var position = {
	lat: 40.4763066,
	lng: -3.6878928
};

var cityName = "Unknown";

function initData() {
	var date = new Date();

	document.getElementById('startDate').value = date.toISOString().slice(0,10);
	document.getElementById('time').value = date.getHours() + ':' + date.getMinutes();

	initMap();
}

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(position.lat, position.lng),
        disableDoubleClickZoom: true,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	marker = new google.maps.Marker({
      position:  new google.maps.LatLng(position.lat, position.lng),
      map: map
    });

    google.maps.event.addListener(map, 'dblclick', function(e) {
        var positionDoubleclick = e.latLng;
        marker.setPosition(positionDoubleclick);
    });
}

function addIntention(event) {
	event.preventDefault();

	var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me');

	var currentUser = auth.currentUser;

	if (currentUser) {
	    var userEmail = currentUser.email;
	    var startDate = intention.startDate.value;
	    var time = intention.time.value;
	    var minutes = intention.minutes.value;
	    var lat = marker.position.lat();
	    var lng = marker.position.lng();

		fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false`)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				var cityName = '';

				data.results.forEach(function(result) {
					result['address_components'].forEach((function(component) {
						component.types.forEach((function(type) {
							if (type === 'locality') {
								cityName = component['short_name'];
							}
						}));
					}));
				});

				var bodyData = {
					userId: auth.currentUser.id,
					startDate: intention.startDate.value,
					time: intention.time.value,
					minutes: intention.minutes.value,
					lat: marker.position.lat,
					lng: marker.position.lat,
					cityName: cityName,
					matched: false
				};

				fetch("http://data.eyes2run.wedeploy.me/intention", {
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					method: "post",
					body: JSON.stringify(bodyData)
				}).then(function() {
					location.href = 'finding.html';
				});

			});
	} else {
		location.href = 'signup.html'
	}
}
