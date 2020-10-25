const bcrypt = require('bcryptjs');

const checkPassword = async (password, hash) => {
	const comparison = await bcrypt.compare(password, hash);
	console.log(comparison);
	return comparison;
};

module.exports = { checkPassword };
