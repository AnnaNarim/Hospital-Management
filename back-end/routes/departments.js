const express = require('express');
const router = express.Router();
const Sequelize=require('sequelize')
const asyncHandler = require('express-async-handler');

const departments=require('../services/departments')

router.get('/', asyncHandler(async (req, res) => {
    const result = await departments.getCars();
     result =_.mapValues(_.groupBy(result, 'name', 'location'),
    clist => clist.map(result => _.omit(result, 'name','location'))
     )
     res.json(result)
}));