const knex = require("../db/connection");

function list() {
    return knex("users").select("*")
}

function listByUsername(username) {
    return knex("users")
            .select("*")
            .where({ username });
}

function create(newUser) {
    return knex("users")
            .insert(newUser)
            .returning("*")
            .then((res) => res[0]);
}

function read(user_id) {
    return knex("users")
            .select("*")
            .where({ user_id })
}

function update(updatedUser, user_id) {
    return knex("users")
            .where({ user_id })
            .update({ ...updatedUser })
            .returning("*")
            .then(res => res[0])
}

function deleteUser(user_id) {
    return knex("users")
            .where({ user_id })
            .del();
}

module.exports = {
    list,
    listByUsername,
    read,
    create,
    update,
    deleteUser
}