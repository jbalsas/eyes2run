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