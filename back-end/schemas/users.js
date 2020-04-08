const bcrypt =require('bcrypt')
const Sequelize=require('sequelize')
const  DoctorNotFound = require(`../errors/errors.js`).DoctorNotFound;

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
    }
    );
    
    users.CreateNewUser = async function(user) {
           
        //select emails from doctors table
        let emails = await doctors.findAll({
            attributes: ['email'],
            raw:true
        })

        emails = emails.map(element=>element.email)
        
        //look wheater you are a doctor
        if(!Array.from(emails).find(element=> element===user.email)) {
            throw new DoctorNotFound();
        }
        // // if (!user.changed('password')) {
        // //     return sequelize.Promise.reject("not modified");
        // //   }

        //if you are let you create account
        const SALT_INIT = 5;
        const salt = bcrypt.genSaltSync(SALT_INIT)
        const hashedPassword =bcrypt.hashSync(user.password, salt)
        user.password =hashedPassword;
        
        users.create({email: user.email, password: user.password, position:'doctor'}).then(()=>console.log('Created'))
        
        return 1
    }

    users.findUserByEmail = function (user_email) {
        return  users.findOne({where: {email: user_email}})
    }
               
    users.prototype.comparePassword =  function (password) {  
        return bcrypt.compareSync(password, this.password);
    }
    
    return users
}









