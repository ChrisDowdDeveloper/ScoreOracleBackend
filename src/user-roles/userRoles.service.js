const knex = require("../db/connection");

function listAllRoles() {
    return knex('userRoles')
        .select("*")
}

function listRoleById(userRoleId) {
    return knex('userRoles')
        .where('userRole_id', userRoleId)
        .first();
}

function createUserRole(userId, role) {
    return knex('userRoles')
        .insert({ userId, role });
}

function updateRole(userRoleId, userId, role) {
    return knex("userRoles")
        .where('userRoleId', userRoleId)
        .update({ userId, role });
}

function deleteRole(userRoleId) {
    return knex('userRoles')
        .where('userRoleId', userRoleId)
        .del();
}

module.exports = {
    listAllRoles,
    listRoleById,
    createUserRole,
    updateRole,
    deleteRole
}