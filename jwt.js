require("dotenv").config();

const JWT = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

// take {UID, username} and return JWT
const createJWT = (uid, username) => JWT.sign({ uid, username }, KEY);

// take JWT and return {UID, username} || Error
const verifyJWT = jwt => {
	const response = JWT.verify(jwt, KEY, (err, uid) => {
		if (err) {
			return err;
		} else {
			return uid;
		}
	});

	return response;
};

module.exports = { createJWT, verifyJWT };
