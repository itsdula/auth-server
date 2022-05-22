const bcrypt = require("bcrypt");

async function hashPassword(password) {
	if (typeof password !== "string") return null;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	} catch (err) {
		console.error(err);
	}
}

module.exports = { hashPassword };
