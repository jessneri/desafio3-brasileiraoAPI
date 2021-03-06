/* Obter jogos do banco de dados */

const database = require('../utils/database');

const obterJogosDaRodada = async (rodada = null) => {
	if (!rodada) {
		return null;
	}
	const query = `SELECT * FROM  jogos WHERE rodada = $1`;
	const result = await database.query({
		text: query,
		values: [rodada],
	});

	return result.rows;
};

const obterJogos = async () => {
	const query = `SELECT * FROM jogos ORDER BY id`;
	const result = await database.query(query);
	return result.rows;
};

const obterJogoId = async (id = null) => {
	if (!id) {
		return null;
	}
	const query = `SELECT * FROM jogos WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const editarPlacar = async (jogo) => {
	const { id, golsCasa, golsVisitante } = jogo;
	const query = {
		text: `UPDATE jogos SET
		gols_casa = $1, gols_visitante = $2
		WHERE id = $3 RETURNING * `,
		values: [golsCasa, golsVisitante, id],
	};
	const result = await database.query(query);
	return result.rows.shift();
};

module.exports = {
	obterJogosDaRodada,
	obterJogos,
	obterJogoId,
	editarPlacar,
};
