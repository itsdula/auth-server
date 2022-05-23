const { hashPassword, createUser, login, removeUser, authorize } = require("./auth");

test("Testing hashPassword", async function () {
	// Testing only null scenario
	expect(await hashPassword(10)).toBeNull();
	expect(await hashPassword(true)).toBeNull();
	expect(await hashPassword({ password: "password" })).toBeNull();
	expect(await hashPassword(["password"])).toBeNull();
	expect(await hashPassword(2.3)).toBeNull();

	// Actual string input
	expect(await hashPassword("password")).toContain("$");
	expect(await hashPassword("someOtherPassword")).toContain("$");
});

test("Testing createUser", async function () {
	// Test adding a user
	expect(await createUser("dula", "1234567890")).toContain(".");
	expect(await createUser("moe", "ejkwbdfkj23")).toContain(".");
	expect(await createUser("aziz", "ewfnoiwefk")).toContain(".");

	// Testing non String values
	expect(await createUser("dula", 30)).toBeNull();
	expect(await createUser(10, "ejkwbdfkj23")).toBeNull();
	expect(await createUser(true, { i: "i" })).toBeNull();
});

test("Testing removeUser", function () {
	const jwt1 = login("dula", "1234567890");
	const jwt2 = login("moe", "ejkwbdfkj23");
	const jwt3 = login("aziz", "ewfnoiwefk");

	expect(removeUser(jwt1)).toBe("dula");
	expect(removeUser(jwt2)).toBe("moe");
	expect(removeUser(jwt3)).toBe("aziz");
});

test("Testing login", async function () {
	// Creating users
	await createUser("dula", "1234567890");
	await createUser("moe", "ejkwbdfkj23");
	await createUser("aziz", "ewfnoiwefk");

	expect(login("dula", "1234567890")).toContain(".");
	expect(login("moe", "ejkwbdfkj23")).toContain(".");
	expect(login("aziz", "ewfnoiwefk")).toContain(".");
});

test("Testing auth", function () {
	const jwt1 = login("dula", "1234567890");
	const jwt2 = login("moe", "ejkwbdfkj23");
	const jwt3 = login("aziz", "ewfnoiwefk");

	expect(authorize(jwt1)).toEqual({ uid: expect.any(String), username: "dula" });
	expect(authorize(jwt2)).toEqual({ uid: expect.any(String), username: "moe" });
	expect(authorize(jwt3)).toEqual({ uid: expect.any(String), username: "aziz" });

	// Clean up users.json
	removeUser(jwt1);
	removeUser(jwt2);
	removeUser(jwt3);
});
