const { getUser, addNewUser, removeUser } = require("./db");
const users = require("./users.json");

test("Getting a single user from the the users.json", function () {
	expect(getUser("0487d34c-289d-4616-9de9-2d858c099973", "dula")).toEqual(users[0]);
	expect(getUser("368a6023-b4b6-4990-a853-6e5f2aba5e5a", "aziz")).toEqual(users[1]);
});

test("Adding a new user to the users.json", function () {});
