const express = require('express');
const router = express.Router();
const Sequelize=require('sequelize')
const asyncHandler = require('express-async-handler');
const users=require('../services/users')
const passport=require('passport')


router.post('/signup', asyncHandler(async (req, res) => {
    const result = await users.createUser(req.body);
    res.status(200).send('Dear Doctor your account has been created successfully!');
}))

router.post('/login', asyncHandler(async(req,res ) =>{
    const result =await users.login(req.body.email, req.body.password);
    //sending JWT, UI must handle
    res.status(200).json(result)
}))

module.exports=router;