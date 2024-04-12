import methodNotAllowed from "../errors/methodNotAllowed";
const router = require("express").Router();
const controller = require("./matches.controller");

router.route("/:id")
    .get(listMatchById)
    .put(controller.updateMatch)
    .delete(controller.deleteMatch)
    .all(methodNotAllowed);

router.route("/")
    .get(controller.listAllMatches)
    .create(controller.createMatch)
    .all(methodNotAllowed);

module.exports = router;