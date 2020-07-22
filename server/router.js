const expressRouter = require('express').Router;
const controller = require('./controllers/controller');
const router = expressRouter();

router.get('/regions', controller.matchRegions);

module.exports = router;
