/* Obter usuário do banco de dados */

const database = require('../utils/database');

const obterUsers = async (email = null) => {
	const query = `SELECT * FROM users WHERE email = $1`;
	const result = await database.query({
		text: query,
		values: [email],
	});
	return result.rows.shift();
};

module.exports = { obterUsers };
