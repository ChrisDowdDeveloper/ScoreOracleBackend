const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();
const controller = require("./matches.controller");

router.route("/:id")
    .get(controller.listMatchById)
    .put(controller.updateMatch)
    .delete(controller.deleteMatch)
    .all(methodNotAllowed);

router.route("/")
    .get(controller.listAllMatches)
    .post(controller.createMatch)
    .all(methodNotAllowed);

module.exports = router;