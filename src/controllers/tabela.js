/* eslint-disable no-restricted-syntax */
/* Ordenação e calculos pra tabela de classificação */
const tabela = [];

const ordemAlfabetica = () => {
	tabela.sort((a, b) => a.nome.localeCompare(b.nome));
};

const ordenarTabela = () => {
	tabela.sort((a, b) => {
		if (
			a.pontos > b.pontos ||
			a.vitorias > b.vitorias ||
			a.saldoGols > b.saldoGols
		) {
			return -1;
		}
		if (
			b.pontos > a.pontos ||
			b.vitorias > a.vitorias ||
			b.saldoGols > a.saldoGols
		) {
			return 1;
		}
		return ordemAlfabetica();
	});
};

const calcularTabela = (nome, pontos, golsFeitos, golsSofridos) => {
	const timeExistente = tabela.find((time) => time.nome === nome);
	if (timeExistente) {
		timeExistente.jogos += 1;
		timeExistente.pontos += pontos;
		timeExistente.vitorias += pontos === 3 ? 1 : 0;
		timeExistente.derrotas += pontos === 0 ? 1 : 0;
		timeExistente.empates += pontos === 1 ? 1 : 0;
		timeExistente.golsFeitos += golsFeitos;
		timeExistente.golsSofridos += golsSofridos;
		timeExistente.saldoGols += golsFeitos - golsSofridos;
	} else {
		tabela.push({
			nome,
			jogos: 1,
			pontos,
			vitorias: pontos === 3 ? 1 : 0,
			derrotas: pontos === 0 ? 1 : 0,
			empates: pontos === 1 ? 1 : 0,
			golsFeitos,
			golsSofridos,
			saldoGols: golsFeitos - golsSofridos,
		});
	}

	return tabela;
};

const criarTabela = (jogos) => {
	for (const jogo of jogos) {
		if (jogo.gols_casa === jogo.gols_visitante) {
			calcularTabela(
				jogo.time_casa,
				1,
				jogo.gols_casa,
				jogo.gols_visitante
			);
			calcularTabela(
				jogo.time_visitante,
				1,
				jogo.gols_visitante,
				jogo.gols_casa
			);
		} else if (jogo.gols_casa > jogo.gols_visitante) {
			calcularTabela(
				jogo.time_casa,
				3,
				jogo.gols_casa,
				jogo.gols_visitante
			);
			calcularTabela(
				jogo.time_visitante,
				0,
				jogo.gols_visitante,
				jogo.gols_casa
			);
		} else {
			calcularTabela(
				jogo.time_casa,
				0,
				jogo.gols_casa,
				jogo.gols_visitante
			);
			calcularTabela(
				jogo.time_visitante,
				3,
				jogo.gols_visitante,
				jogo.gols_casa
			);
		}
	}
	return tabela;
};

module.exports = {
	criarTabela,
	ordemAlfabetica,
	calcularTabela,
	ordenarTabela,
};
