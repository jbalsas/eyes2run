var list = document.querySelector('.list');

WeDeploy.data('http://auth.eyes2run.wedeploy.me')
  .orderBy('id', 'desc')
  .limit(5)
  .get('users')
	.then(function(response) {
		appendUsers(response);
	})
	.catch(function(error) {
		console.error(error);
	});

function appendUsers(users) {
	var userList = '';

	users.forEach(function(user) {
		userList += `<input type="text" value="${user.name}" readonly>`;
	});

	list.innerHTML = userList;
}
