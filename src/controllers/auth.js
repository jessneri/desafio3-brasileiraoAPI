const jwt = require('jsonwebtoken');
const response = require('./response');
const Users = require('../repositories/users');
const Password = require('../utils/password');

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, password = null } = ctx.request.body;
	if (!email && !password) {
		return response(ctx, 400, { message: 'Pedido mal formatado.' });
	}

	const user = await Users.obterUsers(email);

	if (user) {
		const comparison = await Password.checkPassword(password, user.senha);

		if (comparison) {
			const token = await jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'cubosacademy',
				{ expiresIn: '1d' }
			);
			return response(ctx, 200, { token });
		}
	}
	return response(ctx, 200, { message: 'Email ou senha incorretos.' });
};

module.exports = { autenticar };
