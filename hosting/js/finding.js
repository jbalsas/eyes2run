var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me');

var currentUser = auth.currentUser;

WeDeploy
    .data('http://data.eyes2run.wedeploy.me')
    .watch('intention')
    .on('changes', function(data) {
        location.href = 'partner.html';
    })
    .on('fail', function(error) {
        console.log(error);
    });