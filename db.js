const fs = require("fs");

const FILE_PATH = "./users.json";

function getUser(uid, username) {
	// Get all users
	const users = readUsersFile();

	// return value is null unless the upcoming logic mutates it
	let user = null;

	for (u in users) {
		// Check if there is a username match
		if (users[u].username === username && users[u].uid === uid) {
			user = users[u];
		}
	}
	return user;
}

function addNewUser(user) {
	// Get all users
	const users = readUsersFile();

	// Append the new user to the list of users
	users[users.length] = user;

	// Store the new array of users
	saveUsersFile(users);
}

function removeUser(uid, username) {
	// Get all users
	const users = readUsersFile();

	users.filter(user => {
		return user.uid !== uid && user.username !== username;
	});
}

const readUsersFile = () => JSON.parse(fs.readFileSync(FILE_PATH, { encoding: "utf-8" }));
const saveUsersFile = users => fs.writeFileSync(FILE_PATH, JSON.stringify(users));

module.exports = { getUser, addNewUser, removeUser };
