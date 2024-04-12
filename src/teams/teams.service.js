const knex = require("../db/connection")

function listAllTeams() {
    return knex('teams')
        .select("*");
}

function listTeamById(teamId) {
    return knex("teams")
        .where("team_id", teamId)
        .first();
}

function createTeam(newTeam) {
    return knex("teams")
        .insert(newTeam);
}

function updateTeam(updatedTeam, team_id) {
    return knex("teams")
            .where({ team_id })
            .update({ ...updatedTeam })
            .returning("*")
            .then(res => res[0])
}

function deleteTeam(team_id) {
    return knex("teams")
        .where({ team_id })
        .del();
}

module.exports = {
    listAllTeams,
    listTeamById,
    createTeam,
    updateTeam,
    deleteTeam
}

