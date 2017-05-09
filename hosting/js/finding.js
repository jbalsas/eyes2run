var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me');

var currentUser = auth.currentUser;

var ariaContainer = document.querySelector('#ariaContainer');
var ariaMsg = ariaContainer.innerHTML;

setInterval(function() {
    fetch("http://data.eyes2run.wedeploy.me/intention/", {
        method: "GET"
    }).then(function(data) {
        return data.json();
    }).then(function(intentions) {
        var match = intentions.filter(function(intention) {
            return intention.matched === currentUser.id;
        });

        if (match.length) {
            location.href = `partner.html?partner=${match[0].matched}`;
        } else {
            ariaContainer.innerHTML = ariaMsg;
        }
    });
}, 5000);

var currentUser = WeDeploy.auth('http://auth.eyes2run.wedeploy.me').currentUser;

if (currentUser) {
    document.getElementById('userName').innerHTML = currentUser.name;
    document.getElementById('userFirstLetter').innerHTML = currentUser.name.substring(0,1);
}

function out() {
    WeDeploy.auth('auth.eyes2run.wedeploy.me').signOut()
    .then(() => {
        location.href = '/';
    });
}