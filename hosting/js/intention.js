var marker;
var position = {
	lat: 40.4763066,
	lng: -3.6878928
};

function initData() {
	var date = new Date();

	document.getElementById('startDate').value = date.toISOString().slice(0,10);
	document.getElementById('time').value = date.getHours() + ':' + date.getMinutes();

	initMap();
}

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(position.lat, position.lng),
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
	var currentUser = WeDeploy.auth('http://auth.eyes2run.wedeploy.me').currentUser;

	if (currentUser) {
	    var userEmail = currentUser.email;
	    var startDate = intention.startDate.value;
	    var time = intention.time.value;
	    var minutes = intention.minutes.value;
	    var lat = marker.position.lat;
	    var lng = marker.position.lat;

	    //TODO conectar con wedploy y redirigir a findings.html
	    location.href = 'finding.html';

	} else {
		location.href = 'signup.html'
	}
}
