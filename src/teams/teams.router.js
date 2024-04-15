const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();
const controller = require("./teams.controller");

router.route("/:id")
    .get(controller.listByTeamId)
    .put(controller.updateTeam)
    .delete(controller.deleteTeam)
    .all(methodNotAllowed)

router.route("/")
    .get(controller.listAllTeams)
    .post(controller.createTeam)
    .all(methodNotAllowed);

module.exports = router;