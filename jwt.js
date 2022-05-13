require("dotenv").config();

const JWT = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

// take UID and return JWT
const createJWT = uid => JWT.sign(uid, KEY);

// take JWT and return UID || Error
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
