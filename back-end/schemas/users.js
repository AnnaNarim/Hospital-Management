const bcrypt =require('bcrypt')
const Sequelize=require('sequelize')
const  DoctorNotFound = require(`../errors/errors.js`).DoctorNotFound;
const EmailIsIncorrect = require(`../errors/errors.js`).EmailIsIncorrect;
const UserAlreadyExists =require(`../errors/errors.js`).UserAlreadyExists

module.exports = (sequelize, DataTypes, doctors) => {
    
    const users= sequelize.define('users',{
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true ,
        timestamps: false
    });
    
    users.CreateNewUser = async function(new_user) {

        //check that you do not create account for user which already exists
        let check = await users.findAll({
            attributes: ['id'],
            where: {
                email: new_user.email
            },
            raw:true
        })

        if(check.length!=0){
            throw new UserAlreadyExists()
        }
           
        //select emails from doctors table
        let emails = await doctors.findAll({
            attributes: ['email'],
            raw:true
        })

        emails = emails.map(element=>element.email)
        
        //look wheater you are a doctor
        if(!Array.from(emails).find(element=> element===new_user.email)) {
            throw new DoctorNotFound();
        }
     
        //if selected is let you create account
        const SALT_INIT = 5;
        const salt = bcrypt.genSaltSync(SALT_INIT)
        const hashedPassword =bcrypt.hashSync(new_user.password, salt)
        new_user.password =hashedPassword;
        
        users.create({email: new_user.email, password: new_user.password}).then(()=>console.log('Created'))
        
        return 1
    }

    users.findUserByEmail = async function (user_email) {
        let myUser = await users.findOne({where:{ email: user_email}})
        if(!myUser){
            throw new EmailIsIncorrect();
        }
        user= users.build(myUser)
        user.password =myUser.password
        return user
    }
               
    users.prototype.comparePassword =  function (password) {  
        return  bcrypt.compareSync(password, this.password);
    }
    
    return users
}









