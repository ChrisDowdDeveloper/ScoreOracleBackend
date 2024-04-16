const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const { username } = req.query;
    if(username) {
        const data = await service.listByUsername(username);
        res.json({ data });
    }
}

async function create(req, res) {
    const created = await service.create(req.body);
    res.status(201).json({ data: created });
}

async function read(req, res) {
    const { user_id } = req.params;
    const response = await service.read(user_id);
    const data = response[0];
    res.json({ data });
}

async function update(req, res, next) {
    const { user_id } = req.params;
    const updated = { ...req.body };
    const data = await service.update(updated, user_id);
    res.status(200).json({ data });
}

async function deleteUser(req, res, next) {
    const { user_id } = req.params;
    const deletedUser = await service.deleteUser(user_id);
    if(deletedUser) {
        res.json({ message: "user successfully deleted" })
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    read: asyncErrorBoundary(read),
    update: asyncErrorBoundary(update),
    delete: asyncErrorBoundary(deleteUser)
};