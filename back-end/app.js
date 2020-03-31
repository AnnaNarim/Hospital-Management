require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);

const cars = require('./routes/cars');
const users = require('./routes/users');

const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/cars', cars);
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('data received successfully!');
});

app.use((err, req, res, next) => {
    if(err.message === 'login error') {
        res.sendStatus(401);
        return;
    }

    console.log(`Error on server! => ${err.stack}`);
    res.sendStatus(500);
})

http.listen(3100, () => {
    console.log('Server successfully started! 🤘🏻');
});