const Router = require('koa-router');

const router = new Router();

const Classificacao = require('./controllers/classificacao');
const Rodadas = require('./controllers/rodadas');
const Auth = require('./controllers/auth');
const Session = require('./middlewares/session');

/**
 * Definição de rotas
 */

router.get('/jogos/:rodada', Rodadas.obterJogosDaRodada);
router.post('/jogos', Session.verify, Rodadas.editarJogoDaRodada);
router.get('/classificacao', Classificacao.obterClassificacao);
router.post('/auth', Auth.autenticar);

module.exports = router;
