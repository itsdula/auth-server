const { hashPassword } = require("./auth");

let hashedPassword = "";
try {
	hashedPassword = hashPassword("43klf34f").then(res => {
		const newUser = {
			uid: require("uuid").v4(),
			username: "Anthony Hopkins",
			password: res,
		};

		console.log(newUser);
	});
} catch (error) {
	console.log(error);
}
