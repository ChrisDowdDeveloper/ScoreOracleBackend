const knex = require("../db/connection");

function listAllPredictions() {
    return knex('predictions')
        .select("*")
}

function listPredictionById(prediction_id) {
    return knex('predictions')
        .where({ prediction_id })
        .first();
}

function createPrediction(newPrediction) {
    return knex('predictions')
        .insert(newPrediction);
}

function updatePrediction(updated, prediction_id) {
    return knex('predictions')
        .where({ prediction_id })
        .update({ ...updated })
        .returning("*")
        .then(res => res[0])
}

function deletePrediction(prediction_id) {
    return knex("predictions")
        .where({ prediction_id })
        .del();
}

module.exports = {
    listAllPredictions,
    listPredictionById,
    createPrediction,
    updatePrediction,
    deletePrediction
}