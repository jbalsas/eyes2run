var auth = WeDeploy.auth('auth.eyes2run.wedeploy.io');

function submitForm() {
	auth.createUser({
        blind: user.blind.checked,
		email: user.email.value,
		name: user.name.value,
		password: user.password.value
	})
	.then(function() {
		alert('Account successfully created!');
		signIn();
		user.reset();
	})
	.catch(function() {
		alert('Sign-up failed. Try another email.');
		user.reset();
	});
}

function signIn() {
	auth.signInWithEmailAndPassword(user.email.value, user.password.value)
	.then(function() {
		document.location.href = '/intention.html';
	})
	.catch(function() {
		alert('Sign-in failed. Try another email/password.');
	});
}

function out() {
	auth.signOut()
	.then(() => {
		location.href = '/';
	});
}