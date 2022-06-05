const router = require("express").Router();
const { createUser, login, removeUser, authorize } = require("../auth");
const { serverError, invalidInput, invalidCredentials, forbidden, userNotFound } = require("../ErrMsgs");

// Create user
router.post("/createUser", async function (req, res) {
	const { username, password } = req?.body;
	try {
		const jwt = await createUser(username, password);
		jwt ? res.status(201).json({ jwt, username }) : res.status(400).json({ message: invalidInput });
	} catch (err) {
		console.err(err);
		res.status(500).json({ message: serverError });
	}
});

// Login
router.post("/login", function (req, res) {
	const { username, password } = req?.body;
	const jwt = login(username, password);

	if (jwt) {
		console.log(`\x1b[33m${username} is logged in`);
		res.status(200).json({ jwt, username });
	} else {
		console.log("No JWT");
		res.status(400).json({ message: invalidCredentials });
	}
});

// Authorize
router.get("/auth", function (req, res) {
	const { jwt } = req?.body;

	const user = authorize(jwt);

	user ? res.status(200).json(user) : res.status(403).json({ message: forbidden });
});

router.delete("/removeUser", function (req, res) {
	const { jwt } = req?.body;
	const username = removeUser(jwt);
	username
		? res.status(200).json({ message: `${username} is removed.` })
		: res.status(400).json({ message: userNotFound });
});

module.exports = router;
