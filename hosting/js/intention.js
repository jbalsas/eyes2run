function initData() {
	//get todat startdate and time
	//
	myMap();
}

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function addIntention(event) {
	debugger;
	var currentUser = WeDeploy.auth('http://<serviceID>.<projectID>.wedeploy.io').currentUser;

	if (currentUser) {
	    var userEmail = currentUser.email;
	    var startDate = intention.startDate.value;
	    var time = intention.time.value;
	    var minutes = intention.minutes.value;
	    var location = intention.location.value;


	    //TODO conectar con wedploy

	} else {
		location.href = 'signup.html'
	}
}

initData();