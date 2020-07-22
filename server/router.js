const expressRouter = require('express').Router;
const controller = require('./controllers/controller');
const router = expressRouter();

router.post('/regions', controller.matchRegions);

router.get('/regions/:id', controller.getSlots);

module.exports = router;
