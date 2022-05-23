const bcrypt = require("bcrypt");
const { createJWT, verifyJWT } = require("./jwt");

const { addNewUser, getUserByUsername, deleteUser, getUserByUID } = require("./db");

async function createUser(username, password) {
	// Return null if input is invalid
	if (typeof username !== "string" || typeof password !== "string") return null;
	const hashedPassword = await hashPassword(password);
	const uid = addNewUser(username, hashedPassword);
	// Return null if user is not created
	if (!uid) return null;
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
	const user = verifyJWT(jwt);

	// Return null if not verified
	if (!user) return null;
	const { uid, username } = user;

	// Delete user and confirm
	const { deleted } = deleteUser(uid, username);
	return deleted ? username : null;
}

function authorize(jwt) {
	const user = verifyJWT(jwt);

	// Return null if not verified
	if (!user) return null;
	const { uid, username } = user;

	// Get the user by their UID and compare values
	const userFromDB = getUserByUID(uid);

	// Return null if no user
	if (userFromDB?.uid !== uid) return null;

	return { uid, username };
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

function comparePasswords(password, hashedPassword) {
	const match = bcrypt.compareSync(password, hashedPassword);
	return match;
}

module.exports = { hashPassword, createUser, login, removeUser, authorize };
