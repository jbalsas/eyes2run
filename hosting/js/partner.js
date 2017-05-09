var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me');

var currentUser = auth.currentUser;

var ariaContainer = document.querySelector('#ariaContainer');
var ariaMsg = ariaContainer.innerHTML;

setTimeout(function() {
    ariaContainer.innerHTML = 'Your partner for today is Juan';
}, 5000);