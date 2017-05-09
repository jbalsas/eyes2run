var marker;
var currentPosition;

function initData() {
	//get todat startdate and time
	//

}

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(40.4893538, -3.6827461),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	marker = new google.maps.Marker({
      position:  new google.maps.LatLng(40.4893538, -3.6827461),
      map: map
    });
}

function addIntention(event) {
	var currentUser = WeDeploy.auth('http://<serviceID>.<projectID>.wedeploy.io').currentUser;

	if (currentUser) {
	    var userEmail = currentUser.email;
	    var startDate = intention.startDate.value;
	    var time = intention.time.value;
	    var minutes = intention.minutes.value;
	    var location = intention.location.value;
	    var lat = marker.position.lat;
	    var lng = marker.position.lat;

	    //TODO conectar con wedploy y redirigir a findings.html
	    location.href = 'findings.html'

	} else {
		location.href = 'signup.html'
	}
}

initData();