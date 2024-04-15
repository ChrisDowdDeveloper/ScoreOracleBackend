const service = require("./users.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_FIELDS = [
    "username",
    "email",
    "password",
    "firstName",
    "lastName",
    "dateJoined",
    "dateOfBirth",
    "profilePictureURL"
];

function dateOfBirthValid(req, res, next) {
    const { dateOfBirth } = req.body.data;
    const day = new Date(dateOfBirth).getUTCDate();
    const today = new Date();
    if(day > today) {
        return next({
            status: 400,
            message: "Date of birth cannot be greater than today",
        });
    } else {
        return next();
    }
}

function formHasInput(req, res, next) {
    const { data = {} } = req.body;
    try {
        VALID_FIELDS.forEach((fields) => {
            if(!data[fields]) {
                const error = new Error(`A '${fields} is required`)
                error.status = 400;
                throw error;
            }
        });
        next();
    } catch(err) {
        next(err);
    }
}

async function userExists(req, res, next) {
    const { user_id } = req.body;
    const userById = await service.read(user_id);
    if(userById) {
        res.locals.user = userById;
        return next();
    }
    next({
        status: 404,
        message: "User not found"
    });
}

function usernameIsValid(req, res, next) {
    const username = req.body.data.username;
    const usernameFound = service.read(username);
    if(!usernameFound) {
        return next();
    }
    return next({
        status: 400,
        message: "Username is already taken"
    });
}

function emailIsValid(req, res, next) {
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.body.data.user_email;
    if(regexPattern.test(email)) {
        return next();
    }
    return next({
        status: 400,
        message: "Email must be in the format of example@example.com"
    })
}


async function list(req, res) {
    const { username } = req.query;
    if(username) {
        const data = await service.listByUsername(username);
        res.json({ data });
    }
}

async function create(req, res) {
    const { data } = req.body;
    const created = await service.create(data);
    res.status(201).json({ data: created });
}

async function read(req, res) {
    const { user_id } = req.params;
    const response = await service.read(user_id);
    const data = response[0];
    res.json({ data });
}

async function update(req, res, next) {
    const { user_id } = req.params;
    const updated = { ...req.body.data };
    const data = await service.update(updated, user_id);
    res.status(200).json({ data });
}

async function deleteUser(req, res, next) {
    const { user_id } = req.params;
    const deletedUser = await service.delete(user_id);
    if(deletedUser) {
        res.json({ message: "user successfully deleted" })
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        formHasInput,
        dateOfBirthValid,
        usernameIsValid,
        emailIsValid,
        asyncErrorBoundary(create),
    ],
    read: [asyncErrorBoundary(userExists), asyncErrorBoundary(read)],
    update: [
        asyncErrorBoundary(userExists),
        formHasInput,
        dateOfBirthValid,
        usernameIsValid,
        emailIsValid,
        asyncErrorBoundary(update)
    ],
    delete: asyncErrorBoundary(deleteUser)
};