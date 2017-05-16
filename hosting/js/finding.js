var auth = WeDeploy.auth('auth.eyes2run.wedeploy.io');

var currentUser = auth.currentUser;

var ariaContainer = document.querySelector('#ariaContainer');
var ariaMsg = ariaContainer.innerHTML;

setInterval(function() {
    fetch("http://data.eyes2run.wedeploy.io/matches/", {
        method: "GET"
    }).then(function(data) {
        return data.json();
    }).then(function(matches) {
        var match = matches.filter(function(result) {
            return ((result.match1 === currentUser.id) || (result.match2 === currentUser.id));
        });

        if (match.length) {
            var partner = match[0].match1 === currentUser.id ? match[0].match1 : match[0].match2;

            location.href = `partner.html?partner=${partner}`;
        } else {
            ariaContainer.innerHTML = ariaMsg;
        }
    });
}, 5000);

var currentUser = WeDeploy.auth('http://auth.eyes2run.wedeploy.io').currentUser;

if (currentUser) {
    document.getElementById('userName').innerHTML = currentUser.name;
    if (currentUser.blind) {
        document.getElementById('userIcon').src = '/images/icons/closed-eye.png';
    };
}

function out() {
    WeDeploy.auth('auth.eyes2run.wedeploy.io').signOut()
    .then(() => {
        location.href = '/';
    });
}