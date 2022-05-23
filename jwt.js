require("dotenv").config();

const JWT = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

// take { UID, username } and return JWT
const createJWT = (uid, username) => JWT.sign({ uid, username }, KEY);

// take JWT and return { UID, username } || Error
const verifyJWT = jwt => {
	try {
		return JWT.verify(jwt, KEY);
	} catch (error) {
		return null;
	}
};

module.exports = { createJWT, verifyJWT };
