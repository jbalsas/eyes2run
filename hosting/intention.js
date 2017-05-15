var form = document.querySelector('form');


form.addEventListener('submit', function(e) {
    e.preventDefault();

    var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me').currentUser;

    console.info('UserId:', auth)

    console.info('UserId:', auth.id)

    WeDeploy.data('http://data.eyes2run.wedeploy.me')
        .create('intention', {userId: auth.id })
        .then(function(response) {
            form.reset();
            form.email.focus();
            console.info('Saved:', response);
        })
        .catch(function(error) {
            console.error(error);
        });
});