const { getUserByUID, getUserByUsername, addNewUser, deleteUser } = require("./db");

test("Adding new users to users.json", function () {
	// test adding an entry (manually make users.json an empty array [])
	expect(addNewUser("dula", "1234567890")).toContain("-");
	expect(addNewUser("moe", "fstycvdtyvh")).toContain("-");
	expect(addNewUser("aziz", "ckejfwn3kk")).toContain("-");
	// test adding an existing user
	expect(addNewUser("dula", "1234567890")).toBeNull();
	expect(addNewUser("moe", "aesf434feaa")).toBeNull();
	expect(addNewUser("aziz", "bdsfewfebb")).toBeNull();
});

test("Getting a user from the the users.json", function () {
	// Test getting specific user by username
	expect(getUserByUsername("dula")).toEqual({
		uid: expect.any(String),
		username: "dula",
		password: expect.any(String),
	});
	expect(getUserByUsername("moe")).toEqual({ uid: expect.any(String), username: "moe", password: expect.any(String) });
	expect(getUserByUsername("aziz")).toEqual({
		uid: expect.any(String),
		username: "aziz",
		password: expect.any(String),
	});

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
	expect(deleteUser("No UID", "No username")).toBe(false);

	// Remove the return statement in db.js line 58 for production as it's used for this test
	const [dula, moe, aziz] = require("./users.json");
	expect(deleteUser(dula.uid, dula.username)).toEqual({ deleted: true, newUsers: [moe, aziz] });
	expect(deleteUser(moe.uid, moe.username)).toEqual({ deleted: true, newUsers: [aziz] });
	expect(deleteUser(aziz.uid, aziz.username)).toEqual({ deleted: true, newUsers: [] });
});
