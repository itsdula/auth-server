const { getUser, addNewUser, removeUser } = require("./db");
const users = require("./users.json");

const jc = { uid: "0487d34c-289d-4616-9de9-2d858c099973", username: "John Cena" };
const dj = { uid: "368a6023-b4b6-4990-a853-6e5f2aba5e5a", username: "Dwayne Johnson" };

test("Getting a single user from the the users.json", function () {
	// Testing getting specific users
	// users[0] == jc
	// users[1] == dj
	expect(getUser(jc.uid, jc.username)).toEqual(users[0]);
	expect(getUser(dj.uid, dj.username)).toEqual(users[1]);
});

test("Adding a new user to the users.json", function () {});
