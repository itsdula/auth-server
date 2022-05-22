const { getUserByUID, getUserByUsername, addNewUser, removeUser } = require("./db");

test("Adding new users to users.json", function () {
	// test adding an entry (manually make users.json an empty array [])
	expect(addNewUser("dula", "1234567890")).toEqual({ uid: expect.any(String), username: "dula" });
	expect(addNewUser("moe", "fstycvtyvh")).toEqual({ uid: expect.any(String), username: "moe" });
	expect(addNewUser("aziz", "ckejwn3kk")).toEqual({ uid: expect.any(String), username: "aziz" });
	// test adding an existing user
	expect(addNewUser("dula", "1234567890")).toBeNull();
	expect(addNewUser("moe", "aaa")).toBeNull();
	expect(addNewUser("aziz", "bbb")).toBeNull();
});

test("Getting a user from the the users.json", function () {
	// Test getting specific user by username
	expect(getUserByUsername("dula")).toEqual({ uid: expect.any(String), username: "dula" });
	expect(getUserByUsername("moe")).toEqual({ uid: expect.any(String), username: "moe" });
	expect(getUserByUsername("aziz")).toEqual({ uid: expect.any(String), username: "aziz" });

	// Test getting specific user by UID
	const [dula, moe, aziz] = require("./users.json");
	expect(getUserByUID(dula.uid)).toEqual({ uid: dula.uid, username: "dula" });
	expect(getUserByUID(moe.uid)).toEqual({ uid: moe.uid, username: "moe" });
	expect(getUserByUID(aziz.uid)).toEqual({ uid: aziz.uid, username: "aziz" });

	// Test getting a none user by username && UID
	expect(getUserByUID("No UID")).toBeNull();
	expect(getUserByUsername("No Username")).toBeNull();
});

test("Removing a user from users.json", function () {
	// Removing a user that does not exist
	expect(removeUser("No UID", "No username")).toBeNull();

	// Remove the return statement in db.js line 58 for production as it's used for this test
	const [dula, moe, aziz] = require("./users.json");
	expect(removeUser(dula.uid, dula.username)).toEqual([moe, aziz]);
	expect(removeUser(moe.uid, moe.username)).toEqual([aziz]);
	expect(removeUser(aziz.uid, aziz.username)).toEqual([]);
});
