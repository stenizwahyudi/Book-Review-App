const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');

const bcrypt = require("bcryptjs");

const authParser = require('../middleware/middleware_auth.middleware');



router.post('/', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    return UserModel.addUser(req.body)
        .then((user) => {
                req.session.username = username;
                return res.status(200).send({username});
            },
            error => res.status(500).send(error));
});

router.post('/authenticate', function (req, res) {
    const {username, password} = req.body;
    UserModel.getUserByUserName(username)
        .then((user) => {
            user.comparePassword(password, (error, match) => {
                if (match) {
                    req.session.username = username;
                    return res.status(200).send({username});
                }
                return res.status(400).send("The password does not match");
            });
        })
        .catch((error) => res.status(500).send(error));
})

router.delete('/authenticate', function(req, res) {
    req.session.destroy();
});

router.get('/loggedIn', authParser, function(req, res) {
    return res.sendStatus(200);
})

router.get('/info', authParser, function(req, res) {
    return UserModel.getUserByUserName(req.username)
        .then((response) => res.status(200).send(response),
            error => res.status(500).send(error));
})

router.put('/username/:username', authParser, (req, res) => {
    if (!req.body) {
        return res.status(404).send({message: "Error, please check input!"});
    }
    return UserModel.updateUsername(req.body)
        .then((entry) => res.send(entry),
            (error) => res.status(500).send(error));
});

router.put('/status', (req, res) => {
    if (!req.body) {
        return res.status(404).send({message: "Error, please check input!"});
    }
    return UserModel.updateUserEntry(req.body)
        .then((entry) => res.send(entry),
            (error) => res.status(500).send(error));
});

router.delete('/:name', authParser, (req, res) => {
    return UserModel.deleteUserEntry(req.params.name)
        .then((response) => res.status(200).send(response),
            error => res.status(404).send(error));
});

router.get('/', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));


module.exports = router;