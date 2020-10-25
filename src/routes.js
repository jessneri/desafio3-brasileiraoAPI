const Router = require('koa-router');

const router = new Router();

const Classificacao = require('./controllers/classificacao');
const Rodadas = require('./controllers/rodadas');

/**
 * Definição de rotas
 */

router.get('/jogos/:rodada', Rodadas.obterJogosDaRodada);
router.post('/jogos', Rodadas.editarJogoDaRodada);
router.get('/classificacao', Classificacao.obterClassificacao);
router.post('/auth');

module.exports = router;
