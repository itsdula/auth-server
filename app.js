require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { serverError, invalidInput, invalidCredentials, forbidden, userNotFound } = require("./ErrMsgs");
const { createUser, login, removeUser, authorize } = require("./auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Create user
app.post("/createUser", async function (req, res) {
	const { username, password } = req?.body;
	try {
		const jwt = await createUser(username, password);
		jwt ? res.status(201).json(jwt) : res.status(400).json({ message: invalidInput });
	} catch (err) {
		console.err(err);
		res.status(500).json({ message: serverError });
	}
});

// Login
app.post("/login", function (req, res) {
	const { username, password } = req?.body;
	const jwt = login(username, password);

	jwt ? res.status(200).json(jwt) : res.status(400).json({ message: invalidCredentials });
});

// Authorize
app.get("/auth", function (req, res) {
	const { jwt } = req?.body;

	const user = authorize(jwt);

	user ? res.status(200).json(user) : res.status(403).json({ message: forbidden });
});

app.delete("/removeUser", function (req, res) {
	const { jwt } = req?.body;
	const username = removeUser(jwt);
	username
		? res.status(200).json({ message: `${username} is removed.` })
		: res.status(400).json({ message: userNotFound });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
