const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const usersRouter = require("./users/users.router");
const userRolesRouter = require("./user-roles/userRoles.router");
const matchesRouter = require("./matches/matches.router");
const teamsRouter = require("./teams/teams.router");
const predictionsRouter = require("./predictions/predictions.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/userRoles', userRolesRouter);
app.use('/matches', matchesRouter);
app.use('/teams', teamsRouter);
app.use('/predictions', predictionsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
