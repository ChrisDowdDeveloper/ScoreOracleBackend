const service = require('./predictions.service');
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const listAllPredictions = async(req, res) => {
    service.listAllPredictions()
        .then(predictions => res.json(predictions))
        .catch(err => res.status(500).json(err))
}

const listPredictionById = async(req, res) => {
    service.listPredictionById(req.params.id)
        .then(prediction => prediction ? res.json(prediction) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

const createPrediction = async(req, res) => {
    const { data } = req.body;
    service.createPrediction(data)
        .then(userPredictionId => res.status(201).json({ predictionId: userPredictionId[0] }))
        .catch(err => res.status(500).json(err));
}

const updatePrediction = async(req, res) => {
    const { prediction_id } = req.params;
    const updated = { ...req.body.data };
    const data = await service.updatePrediction(updated, prediction_id);
    res.status(200).json({ data });
}

const deletePrediction = async(req, res) => {
    service.deletePrediction(req.params.id)
        .then(result => result ? res.json({ delete: true }) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

module.exports = {
    listPredictionById: asyncErrorBoundary(listPredictionById),
    listAllPredictions: asyncErrorBoundary(listAllPredictions),
    createPrediction: asyncErrorBoundary(createPrediction),
    update: asyncErrorBoundary(updatePrediction),
    delete: asyncErrorBoundary(deletePrediction),
}