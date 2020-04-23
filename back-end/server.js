const express = require('express');
const app = express();
const Sequelize=require('sequelize')
const users =require('./routes/users')
const home=require('./routes/home')
const cors = require('cors');
const http = require('http').Server(app);
const passport = require('passport');
require('./passport/passport')(passport)

app.use(cors());

app.use(passport.initialize());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/users', users);
app.use('/home', home);

app.use((err, req, res, next) => {
    console.log(`Error on server! => ${err.message}`);
    res.sendStatus(500);
})

app.listen(3000, () => {
    console.log('Server successfully started!');
});

