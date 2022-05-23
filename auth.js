const bcrypt = require("bcrypt");
const { createJWT, verifyJWT } = require("./jwt");

const { addNewUser, getUserByUsername, deleteUser, getUserByUID } = require("./db");

async function createUser(username, password) {
	// Return null if input is invalid
	if (typeof username !== "string" || typeof password !== "string") return null;
	const hashedPassword = await hashPassword(password);
	const uid = addNewUser(username, hashedPassword);
	const JWT = createJWT(uid, username);
	return JWT;
}

function login(username, password) {
	let JWT = null;

	// Return null if input is invalid
	if (typeof username !== "string" || typeof password !== "string") return JWT;

	// Get user from DB
	const user = getUserByUsername(username);
	if (!user) return null;

	// Compare passwords
	if (comparePasswords(password, user.password)) {
		JWT = createJWT(user.uid, username);
	}

	return JWT;
}
function removeUser(jwt) {
	try {
		const { uid, username } = verifyJWT(jwt);
		deleteUser(uid, username);
		return username;
	} catch (err) {
		console.log(err);
		return null;
	}
}

function authorize(jwt) {
	const { username, uid } = verifyJWT(jwt);
	// Get the user by their UID && username and compare values
	const { uid: uid1, username: username1 } = getUserByUID(uid);
	const { uid: uid2, username: username2 } = getUserByUsername(username);

	if (uid1 !== uid2) return null;
	if (username1 !== username2) return null;

	return { username, uid };
}

async function hashPassword(password) {
	if (typeof password !== "string") return null;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	} catch (err) {
		console.error(err);
	}
}

async function comparePasswords(password, hashedPassword) {
	let match = false;
	try {
		match = await bcrypt.compare(password, hashedPassword);
	} catch (err) {
		console.error(error);
	}
	return match;
}

module.exports = { hashPassword, createUser, login, removeUser, authorize };
