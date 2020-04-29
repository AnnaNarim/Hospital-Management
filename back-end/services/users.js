const Sequelize=require('sequelize')
const users=require('../schemas/db').users
const jwt=require('jsonwebtoken')
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;
const { DoctorNotFound,UserAlreadyExists,EmailIsIncorrect, PasswordIncorrect} = require(`../errors/errors.js`);

module.exports = {
    
    createUser: async (newuser) => {

        const newUser= await  users.CreateNewUser(newuser)

        if(!newUser) {
            throw new UserAlreadyExists();
        }
        return newUser;
    },

    login: async (email, password) => {
  
        const user= await users.findUserByEmail(email)
        
         if(!user.comparePassword(password)){ 
             throw new PasswordIncorrect();
         }

         const accessToken = jwt.sign(
            {   
                 email,
                 userid: user._id
            },
             JWT_KEY, 
            {
            expiresIn: "24 hours"
        });
        
        return { email, accessToken };
    } 
}
