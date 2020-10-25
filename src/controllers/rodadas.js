const response = require('./response');

const Jogos = require('../repositories/jogos');

const obterJogosDaRodada = async (ctx) => {
	const { rodada = null } = ctx.params;

	if (rodada) {
		const results = await Jogos.obterJogosDaRodada(rodada);
		if (results) {
			return response(ctx, 200, results);
		}
		return response(ctx, 404, { message: 'Rodada não encontrada.' });
	}

	return response(ctx, 400, { message: 'Requisição mal formatada.' });
};

const editarJogoDaRodada = async (ctx) => {
	const {
		id = null,
		golsCasa = null,
		golsVisitante = null,
	} = ctx.request.body;

	const partida = await Jogos.obterJogoId(id);

	if (partida) {
		const atualizado = {
			...partida,
			golsCasa,
			golsVisitante,
		};
		const result = await Jogos.editarPlacar(atualizado);
		response(ctx, 200, result);
	} else {
		response(ctx, 400, { message: 'Requisição mal formatada.' });
	}
};

module.exports = { obterJogosDaRodada, editarJogoDaRodada };
