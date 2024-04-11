import methodNotAllowed from '../errors/methodNotAllowed';
const router = require("express").Router();
const controller = require("./users.controller");

router
    .route("/:user_id")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router
    .route("/")
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;