const { hashPassword } = require("./auth");
test("Testing hashPassword", async function () {
	// Testing only null scenario
	expect(await hashPassword(10)).toBeNull();
	expect(await hashPassword(true)).toBeNull();
	expect(await hashPassword({ password: "password" })).toBeNull();
	expect(await hashPassword(["password"])).toBeNull();
	expect(await hashPassword(2.3)).toBeNull();

	// Actual string input
	expect(hashPassword("password")).toEqual(expect.any(String));
	expect(hashPassword("someOtherPassword")).toEqual(expect.any(String));
});
test("Testing createUser", function () {});
test("Testing login", function () {});
test("Testing auth", function () {});
test("Testing removeUser", function () {});
