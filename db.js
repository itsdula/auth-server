const fs = require("fs");
const { v4: UID } = require("uuid");

const FILE_PATH = "./users.json";

function getUserByUID(uid) {
	// Get all users
	const users = readUsersFile();

	let user = null;

	for (u in users) {
		// Check if there is a UID match
		if (users[u].uid === uid) user = { uid, username: users[u].username };
	}

	return user;
}

function getUserByUsername(username) {
	// Get all users
	const users = readUsersFile();

	for (u in users) {
		// Check if there is a username match
		if (users[u].username === username) {
			const { uid, password } = users[u];
			return { uid, username, password };
		}
	}

	return null;
}

function addNewUser(username, password) {
	// return null if user exists
	if (getUserByUsername(username)) return null;

	// Get all users
	const users = readUsersFile();

	// Append the new user to the list of users
	const uid = UID();
	users[users.length] = { uid, username, password };

	// Store the new array of users
	saveUsersFile(users);

	return uid;
}

function deleteUser(uid, username) {
	let deleted = false;

	// Return { newUsers[], deleted: flase } if user does not exists
	if (getUserByUID(uid) == getUserByUsername(username)) return deleted;

	// Get all users
	const users = readUsersFile();

	// Filter based on UID and username
	const newUsers = users.filter(function (user) {
		// Confirm deleting
		if (user.uid === uid && user.username === username) deleted = true;
		return user.uid !== uid && user.username !== username;
	});

	// Store all new list of users
	saveUsersFile(newUsers);

	// newUsers is made for testing purpose with JEST
	return { newUsers, deleted };
}

const readUsersFile = () => JSON.parse(fs.readFileSync(FILE_PATH, { encoding: "utf-8" }));
const saveUsersFile = users => fs.writeFileSync(FILE_PATH, JSON.stringify(users));

module.exports = { getUserByUID, getUserByUsername, addNewUser, deleteUser };
