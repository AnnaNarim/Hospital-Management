const Sequelize = require('sequelize')
//const sequelizeTransforms = require('sequelize-transforms');


const sequelize= new Sequelize('hospital2', 'root', 'silva123', {
  host: 'localhost',
  dialect: 'mysql', //|'sqlite'|'postgres'|'mssql'
}); //{query:{raw:true}});
const queryInterface = sequelize.getQueryInterface()
//test the connection
// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// })
//sequelizeTransforms(sequelize)
const departments =require('./departments.js')(sequelize,Sequelize)
const doctors =require('./doctors.js')(sequelize,Sequelize)
const headDoctors =require('./headDoctors.js')(sequelize,Sequelize)
const nurses =require('./nurses.js')(sequelize,Sequelize)
const doctorsNurses= require('./doctorsNurses')(sequelize,Sequelize)
const patients =require('./patients.js')(sequelize,Sequelize)
const treatments =require('./treatments.js')(sequelize,Sequelize)

// One to Many: Doctors-Departments 
 departments.hasMany(doctors, {
  foreignKey: {
    name: 'department_name',
    allowNull: false
  }, sourceKey:'name'})
doctors.belongsTo(departments, {foreignKey:'department_name', targetKey:'name'})

//headDoctors - doctors
headDoctors.belongsTo(doctors,{ 
  foreignKey:{
    name: 'doctor_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    primaryKey: 'head_doctor'
  }, targetKey:'id',
  onDelete: 'CASCADE'})

doctors.hasOne(headDoctors,{
  foreignKey: {
    name: 'doctor_id'
  }, 
  sourceKey: 'id'
} )

//headdoctors-departments
headDoctors.belongsTo(departments,{ 
  foreignKey:{
    name: 'department_name',
    type:Sequelize.STRING,
    allowNull: false,
    unique:true,
    primaryKey: 'head_doctor'
  }, targetKey:'name',
  onDelete: 'CASCADE'
})

departments.hasOne(headDoctors,{
  foreignKey:  'department_name', 
  sourceKey: 'name'
})

//many to many doctors nurses
doctors.belongsToMany(nurses,{
  through: doctorsNurses,
  foreignKey: {
    name: 'doctor_id', 
    allowNull: false,
    primaryKey:'dn'
    
  }
})

nurses.belongsToMany(doctors,{
  through: doctorsNurses,
  foreignKey: {
    name: 'nurse_id', 
    allowNull: false,
    primaryKey:'dn'
    
  }
})


//many to many treatments
doctors.belongsToMany(patients, {
  through: treatments,
  foreignKey:{
  name: 'doctor_id',
  allowNull: false ,
  unique: 'h'} 
}
)

patients.belongsToMany(doctors, {
  through:treatments,
  foreignKey:{
    name: 'patient_id',
    allowNull: false ,
    unique: 'h'} 
  }
)



const users=require('./users.js')(sequelize,Sequelize, doctors)

//sequelize.sync({force:true}).then(()=>console.log("Tebles are Created"))

module.exports={
    sequelize,
    departments,
    doctors,
    headDoctors,
    nurses,
    doctorsNurses,
    patients,
    treatments,
    users
}
  




