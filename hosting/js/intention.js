var marker;
var currentPosition;

function initData() {
	var date = new Date();

	document.getElementById('startDate').value = date.toISOString().slice(0,10);
	document.getElementById('time').value = date.getHours() + ':' + date.getMinutes();
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
	event.preventDefault();

	var auth = WeDeploy.auth('http://auth.eyes2run.wedeploy.me');
	var currentUser = auth.currentUser;

	if (currentUser) {
	    var userEmail = currentUser.email;
	    var startDate = intention.startDate.value;
	    var time = intention.time.value;
	    var minutes = intention.minutes.value;
	    var lat = marker.position.lat;
	    var lng = marker.position.lat;
		
		debugger;
		
		WeDeploy
           .data('data.eyes2run.wedeploy.me') // this should be io in production
           .create('states', {
               id: 1,
               userId: 2,
               busy: 1,
               date: Date.now(),
           }).then(function(state) {
			   debugger;
               console.info('Saved:', state);
           })
           .catch(function(error) {
			   debugger;
               console.error(error);
           });
/*
		WeDeploy.data('http://data.eyes2run.wedeploy.me')
			.create('intention', {
				userId: '1111',
				matched: false
			})
			.then(function(response) {
				debugger;
				location.href = 'finding.html';
			})
			.catch(function(error) {
				console.error(error);
			});
*/
	    //TODO conectar con wedploy y redirigir a findings.html
	    

	} else {
		location.href = 'signup.html'
	}
}

initData();