const express = require('express');
const router = express.Router();
const cars = require('../services/cars');
const asyncHandler = require('express-async-handler');

// router.get('/', asyncHandler(async (req, res) => {
//     const result = await cars.getCars();
//     res.json(result);
// }));

router.get('/', asyncHandler(async (req, res) => {
    const result = "liqy carssss";
    res.json(result);
}));

// router.get('/:id', asyncHandler(async (req, res) => {
//     const result = await cars.findCar(req.params && req.params.id);
//     res.json(result);
// }))

// router.post('/', asyncHandler(async (req, res) => {
//     const socketio = req.app.get('socketio');
//     const car = await cars.addCar(req.body);
//     socketio.emit('car-saved', car);
//     res.json(car);
// }))

module.exports = router;