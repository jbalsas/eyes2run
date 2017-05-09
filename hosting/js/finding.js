var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me');

var currentUser = auth.currentUser;

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
        }
    });
}, 1000);

var currentUser = WeDeploy.auth('http://auth.eyes2run.wedeploy.me').currentUser;
if (currentUser) {
    document.getElementById('userName').innerHTML = currentUser.name;
    if (currentUser.blind) {
        document.getElementById('userIcon').src = '/images/icons/closed-eye.png';
    };
}

function out() {
    WeDeploy.auth('auth.eyes2run.wedeploy.me').signOut()
    .then(() => {
        location.href = '/';
    });
}