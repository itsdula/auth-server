require("dotenv").config();
const JWT = require("jsonwebtoken");
const { createJWT, verifyJWT } = require("./jwt");

const KEY = process.env.JWT_SECRET;

const jc = { uid: "0487d34c-289d-4616-9de9-2d858c099973", username: "John Cena" };
const dj = { uid: "368a6023-b4b6-4990-a853-6e5f2aba5e5a", username: "Dwayne Johnson" };

test("Testing create JWT", function () {
	// Testing createJWT with different users
	expect(createJWT(jc.uid, jc.username)).toEqual(JWT.sign(jc, KEY));
	expect(createJWT(dj.uid, dj.username)).toEqual(JWT.sign(dj, KEY));
});

test("Testing JWT's verification", function () {
	// Testing verifyJWT with happy scenario
	const jcJWT = createJWT(jc.uid, jc.username);
	const djJWT = createJWT(dj.uid, dj.username);
	// verifyJWT generates a Number variable named 'iat'
	expect(verifyJWT(jcJWT)).toEqual({ ...jc, iat: expect.any(Number) });
	expect(verifyJWT(djJWT)).toEqual({ ...dj, iat: expect.any(Number) });

	// Testing a wrong JWT which returns an error
	const JWT1 =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
	const JWT2 =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImZkY3MgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.diNXyty5qwqNLWriGU13D0EXVGmzLliK_iQQguvn0d0";

	// Expected error
	const JsonWebTokenError = {
		name: "JsonWebTokenError",
		message: "invalid signature",
	};

	expect(verifyJWT(JWT1)).toEqual(JsonWebTokenError);
	expect(verifyJWT(JWT2)).toEqual(JsonWebTokenError);
});
