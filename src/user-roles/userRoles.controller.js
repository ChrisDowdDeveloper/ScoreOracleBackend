const service = require('./userRoles.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const listAllRoles = async(req, res) => {
    service.listAllRoles()
        .then(roles => res.json(roles))
        .catch(err => res.status(500).json(err));
}

const listRoles = async(req, res) => {
    service.listRoleById(req.params.id)
        .then(role => role ? res.json(role) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

const createRole = async(req, res) => {
    const { userId, role } = req.body;
    service.createUserRole(userId, role)
        .then(roleId => res.status(201).json({ userRoleId: roleId[0] }))
        .catch(err => res.status(500).json(err));
}

const updateRole = async(req, res) => {
    const { userId, role } = req.body;
    service.updateRole(req.params.id, userId, role)
        .then(result => result ? res.json({ updated: true }) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

const deleteRole = async(req, res) => {
    service.deleteUserRole(req.params.id)
        .then(result => result ? res.json({ deleted: true }) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

module.exports = {
    listRoles: asyncErrorBoundary(listRoles),
    listAllRoles: asyncErrorBoundary(listAllRoles),
    create: asyncErrorBoundary(createRole),
    update: asyncErrorBoundary(updateRole),
    delete: asyncErrorBoundary(deleteRole)
}