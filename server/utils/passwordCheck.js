const bcrypt = require('bcrypt');

function isPasswordConfirm(password, passwordConfirm) {
	return password === passwordConfirm;
}

async function isPasswordValid(password, hashedPassword) {
	try {
		const isPassValid = await bcrypt.compare(password, hashedPassword);
		return isPassValid;
	} catch (error) {
		console.error(error);
		rres.send('Something went wrong on our server. Please try later.');
	}
}

module.exports = { isPasswordConfirm, isPasswordValid };
