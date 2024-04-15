const service = require( "./matches.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const listAllMatches = async(req, res) => {
    service.listAllMatches()
        .then(matches => res.json(matches))
        .catch(err => res.status(500).json(err));
}

const listMatchById = async(req, res) => {
    service.listMatchById(req.params.id)
        .then(match => match ? res.json(match) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

const createMatch = async(req, res) => {
    const { homeTeamId, awayTeamId, status } = req.body;
    service.createMatch(homeTeamId, awayTeamId, status)
        .then(matchId => res.status(201).json({ matchId: matchId, message: "Match created successfully" }))
        .catch(err => res.status(500).json({ error: "Failed to create match", details: err }));
}

const updateMatch = async(req, res) => {
    const { homeTeamId, awayTeamId, status } = req.body;
    service.updateMatch(req.params.id, homeTeamId, awayTeamId, status)
        .then(result => result ? res.json({ updated: true }) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

const deleteMatch = async(req, res) => {
    service.deleteMatch(req.params.id)
        .then(result => result ? res.json({ delete: true }) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

module.exports = {
    createMatch: asyncErrorBoundary(createMatch),
    listAllMatches: asyncErrorBoundary(listAllMatches),
    deleteMatch: asyncErrorBoundary(deleteMatch),
    updateMatch: asyncErrorBoundary(updateMatch),
    listMatchById: asyncErrorBoundary(listMatchById),
}