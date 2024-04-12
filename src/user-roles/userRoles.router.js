const router = require("express").Router();
const controller = require('./userRoles.controller');
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:id")
    .get(controller.listRoles)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router.route('/')
    .get(controller.listAllRoles)
    .create(controller.create)

module.exports = router;

