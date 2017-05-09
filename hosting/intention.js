var form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    WeDeploy.data('http://data.eyes2run.wedeploy.me')
        .create('intentions', {name: form.email.value })
        .then(function(response) {
            form.reset();
            form.item.focus();
            console.info('Saved:', response);
        })
        .catch(function(error) {
            console.error(error);
        });
});