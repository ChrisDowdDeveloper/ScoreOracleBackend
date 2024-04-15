const service = require("./teams.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const listAllTeams = async(req, res) => {
    service.listAllTeams()
        .then(teams => res.json(teams))
        .catch(err => res.status(500).json(err));
}

const listByTeamId = async(req, res) => {
    service.listByTeamId()
        .then(team => team ? res.json(team) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

const createTeam = async(req, res) => {
    const { data } = req.body;
    service.createTeam(data)
        .then(teamId => res.status(201).json({ teamId: teamId, message: "Team created successfully" }))
        .catch(err => res.status(500).json({ error: "Failed to create team", details: err }));
}

const updateTeam = async(req, res) => {
    const { team_id } = req.params;
    const updated = { ...req.body.data };
    const data = await service.updateTeam(updated, team_id);
    res.status(200).json({ data });
}

const deleteTeam = async(req, res) => {
    service.deleteTeam(req.params.id)
        .then(result => result ? res.json({ delete: true }) : res.status(404).end())
        .catch(err => res.status(500).json(err));
}

module.exports = {
    createTeam: asyncErrorBoundary(createTeam),
    listAllTeams: asyncErrorBoundary(listAllTeams),
    listByTeamId: asyncErrorBoundary(listByTeamId),
    updateTeam: asyncErrorBoundary(updateTeam),
    deleteTeam: asyncErrorBoundary(deleteTeam)
}


