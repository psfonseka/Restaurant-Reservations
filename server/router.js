const expressRouter = require('express').Router;
const controller = require('./controllers/controller');
const router = expressRouter();

router.post('/regions', controller.matchRegions);

module.exports = router;
