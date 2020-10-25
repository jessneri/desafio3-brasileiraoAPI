const response = require('./response');
const Jogos = require('../repositories/jogos');
const Tabela = require('./tabela');

const obterClassificacao = async (ctx) => {
	const jogos = await Jogos.obterJogos();
	if (jogos) {
		const tabela = await Tabela.criarTabela(jogos);
		response(ctx, 200, tabela);
	} else {
		response(ctx, 404, { message: 'Conteúdo não encontrado' });
	}
};

module.exports = { obterClassificacao };
