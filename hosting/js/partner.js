var auth = WeDeploy.auth('auth.eyes2run.wedeploy.me');

var currentUser = auth.currentUser;

var ariaContainer = document.querySelector('#ariaContainer');
var partnerContainer = document.querySelector('#partnerContainer');
var ariaMsg = ariaContainer.innerHTML;

var partnerId = /\?(.*)=(.*)/.exec(location.search)[2];
var gender = (parseInt(partnerId) % 2) ? 'men' : 'women';
var avatarId = partnerId.substring(0, 2);

var avatar = new Image();
avatar.onload = function() {
    partnerContainer.appendChild(avatar);
};

avatar.className = 'avatar';
avatar.src = `https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg`;

setTimeout(function() {
    ariaContainer.innerHTML = 'Your partner for today is Juan';
}, 5000);