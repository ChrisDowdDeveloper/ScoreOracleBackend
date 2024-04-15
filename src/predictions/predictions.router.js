const router = require("express").Router();
const controller = require('./predictions.controller');
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route('/:id')
    .get(controller.listPredictionById)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router.route('/')
    .get(controller.listAllPredictions)
    .post(controller.createPrediction)
    .all(methodNotAllowed);

module.exports = router;