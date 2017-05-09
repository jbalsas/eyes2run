WeDeploy
    .data('http://auth.eyes2run.wedeploy.me')
    .and('blind', !user.blind)
    .watch('users')
    .on('changes', function(data) {
        location.href = 'partner.html';
    })
    .on('fail', function(error) {
        console.log(error);
    });