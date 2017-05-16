var auth = WeDeploy.auth('auth.eyes2run.wedeploy.io');

var currentUser = auth.currentUser;

var ariaContainer = document.querySelector('#ariaContainer');
var partnerContainer = document.querySelector('#partnerContainer');
var ariaMsg = ariaContainer.innerHTML;

var partner = /\?(.*)=(.*)/.exec(location.search);
var partnerId = partner[2];

var gender = (parseInt(partnerId) % 2) ? 'men' : 'women';
var avatarId = partnerId.substr(partnerId.length - 2, 2);

var avatar = new Image();
avatar.onload = function() {
    partnerContainer.appendChild(avatar);
};

avatar.className = 'avatar';
avatar.src = `https://randomuser.me/api/portraits/${gender}/${avatarId}.jpg`;

setTimeout(function() {
    ariaContainer.innerHTML = `Your partner for today is ${partnerId}`
}, 5000);