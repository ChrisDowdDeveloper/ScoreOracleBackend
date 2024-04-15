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
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;

