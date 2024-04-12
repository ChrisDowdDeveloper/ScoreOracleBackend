const knex = require("../db/connection");

function listAllMatches() {
    return knex('matches')
        .select('*')
}

function listMatchById(matchId) {
    return knex("matches")
        .where("match_id", matchId)
        .first();
}

function createMatch(homeTeamId, awayTeamId, status) {
    return knex("matches")
        .insert({ homeTeamId, awayTeamId, status });
}

function updateMatch(matchId, homeTeamId, awayTeamId, status) {
    return knex("matches")
        .where("match_id", matchId)
        .update("homeTeamId", homeTeamId)
        .update("awayTeamId", awayTeamId)
        .update("status", status);
}

function deleteMatch(matchId) {
    return knex("matches")
        .where("match_id", matchId)
        .del();
}

module.exports = {
    listAllMatches,
    listMatchById,
    createMatch,
    updateMatch,
    deleteMatch
}