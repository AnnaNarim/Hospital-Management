const express = require('express');
const app = express();
const Sequelize=require('sequelize')
const users =require('./routes/users')
const home=require('./routes/home')
const cors = require('cors');
const http = require('http').Server(app);
const passport = require('passport');
require('./passport/passport')(passport)
const {EmailIsIncorrect, PasswordIncorrect,IncorrectNurse} =require('./errors/errors')

app.use(cors());

app.use(passport.initialize());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/users', users);
app.use('/home', home);

app.use((err, req, res, next) => {
    console.log(`Error on server! => ${err.message}`);
    let status = 500;
    switch (true) {
    case err instanceof EmailIsIncorrect :
      status = 404;
      break;
    case err instanceof PasswordIncorrect :
      status = 401;
      break;
    case err instanceof IncorrectNurse :
      status = 400;
      break;
  }
  res.status(status).json(err.message);
})

app.listen(3030, () => {
    console.log('Server successfully started!');
});

