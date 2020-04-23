const Sequelize = require('sequelize')

const sequelize= new Sequelize('hospital2', 'root', 'silva123', {
  host: 'localhost',
  dialect: 'mysql', //|'sqlite'|'postgres'|'mssql'
  query:{raw:true}
}); 

//test the connection
// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// })

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

//headDoctors-departments
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
doctors.hasMany(doctorsNurses, {
  foreignKey: {
    name: 'doctor_id',
    allowNull: false,
    primaryKey: 't'
  }, sourceKey:'id'})
doctorsNurses.belongsTo(doctors, {foreignKey:'doctor_id', targetKey:'id'})

nurses.hasMany(doctorsNurses, {
  foreignKey: {
    name: 'nurse_id',
    allowNull: false,
    primaryKey: 't',
  }, sourceKey:'id'})
doctorsNurses.belongsTo(nurses, {foreignKey:'nurse_id', targetKey:'id'})
doctorsNurses.removeAttribute('id');

//many-to-many doctors treatments
doctors.hasMany(treatments, {
  foreignKey: {
    name: 'doctor_id',
    allowNull: false,
    primaryKey:'h',
  }, sourceKey:'id'})
treatments.belongsTo(doctors, {foreignKey:'doctor_id', targetKey:'id'})

patients.hasMany(treatments, {
  foreignKey: {
    name: 'patient_id',
    allowNull: false,
    primaryKey: 'h'
  }, sourceKey:'id'})
treatments.belongsTo(patients, {foreignKey:'patient_id', targetKey:'id'})
treatments.removeAttribute('id');


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
  




