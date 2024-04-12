const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler").default;
const notFound = require("./errors/notFound").default;
const usersRouter = require("./users/users.router");
const userRolesRouter = require("./user-roles/userRoles.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/userRoles', userRolesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
