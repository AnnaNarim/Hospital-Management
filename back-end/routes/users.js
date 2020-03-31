const express = require('express');
const router = express.Router();
const users = require('../services/users');
const asyncHandler = require('express-async-handler');

router.post('/', asyncHandler(async (req, res) => {
    const result = await users.createUser(req.body);
    res.json(result);
}))

router.post('/login', asyncHandler(async (req, res) => {
    const result = await users.login({username: req.body.username, password: req.body.password});
    res.json(result);
}))

module.exports = router;