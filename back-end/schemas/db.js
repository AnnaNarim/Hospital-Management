const Sequelize = require('sequelize')
//const sequelizeTransforms = require('sequelize-transforms');

//To connect to the database, you must create a Sequelize instance. 
//create Sequelize instance 
const sequelize= new Sequelize('hospital', 'root', 'silva123', {
  host: 'localhost',
  dialect: 'mysql', //|'sqlite'|'postgres'|'mssql'
}); //{query:{raw:true}});

//test the connection
// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// })
//sequelizeTransforms(sequelize)
const departments =require('./departments.js')(sequelize,Sequelize)
const departmentsPhones=require('./departmentsPhones.js')(sequelize,Sequelize)

//OneToMany Department-Phones
departments.hasMany(departmentsPhones, {
  foreignKey: {
    name: 'department_name',
    type:Sequelize.STRING,
    allowNull: false,
    primaryKey: 'department_phone'
  }, sourceKey: 'name'
})
departmentsPhones.belongsTo(departments, {foreignKey:'department_name', targetKey:'name'})

 const doctors =require('./doctors.js')(sequelize,Sequelize)
// One to Many: Doctors-Departments 
 departments.hasMany(doctors, {
  foreignKey: {
    allowNull: false
}})
doctors.belongsTo(departments)

const doctorsPhones =require('./doctorsPhones.js')(sequelize,Sequelize)

 doctors.hasMany(doctorsPhones, {
  foreignKey: {
    name: 'doctor_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    primaryKey: 'doctor_phone'
  }, sourceKey: 'id'
})
doctorsPhones.belongsTo(doctors, {foreignKey:'doctor_id', targetKey:'id'})

const headDoctors =require('./headDoctors.js')(sequelize,Sequelize)

departments.hasMany(headDoctors,{
  foreignKey: {
    name: 'doctor_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    primaryKey: 'head_doctor'
  }, 
  sourceKey: 'id',
  onDelete: 'CASCADE'
} )

headDoctors.belongsTo(departments,{ foreignKey:'doctor_id', targetKey:'id'})

headDoctors.belongsTo(departments,{ 
  foreignKey:{
    name: 'department_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    unique:true,
    primaryKey: 'head_doctor'
  }, targetKey:'id',
  onDelete: 'CASCADE'
})

departments.hasOne(headDoctors,{
  foreignKey:  'department_id', 
  sourceKey: 'id'
})


const nurses =require('./nurses.js')(sequelize,Sequelize)

doctors.hasMany(nurses,{
  foreignKey: {
    name: 'doctor_id',
    type:Sequelize.INTEGER,
    allowNull: false
  }, 
  sourceKey: 'id',
  onDelete: 'CASCADE'
})

nurses.belongsTo(doctors,{foreignKey:'doctor_id', targetKey:'id'})

const nursesPhones =require('./nursesPhones.js')(sequelize,Sequelize)

nurses.hasMany(nursesPhones, {
  foreignKey: {
    name: 'nurse_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    primaryKey: 'nurse_phone'
  }, sourceKey: 'id',
  onDelete: "CASCADE"
})
nursesPhones.belongsTo(nurses, {foreignKey:'nurse_id', targetKey:'id'})

const patients =require('./patients.js')(sequelize,Sequelize)
const patientsPhones=require('./patientsPhones.js')(sequelize,Sequelize)

patients.hasMany(patientsPhones, {
  foreignKey: {
    name: 'patient_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    primaryKey: 'patient_phone'
  }, 
  sourceKey: 'id',
  onDelete: "CASCADE"
})
patientsPhones.belongsTo(patients, {foreignKey:'patient_id', targetKey:'id'})

const doctorsPatients =require('./doctorsPatients.js')(sequelize,Sequelize)
doctors.belongsToMany(patients, {
  through:doctorsPatients,
  allowNull: false,
  primaryKey: 'doctor_patient'}
)

patients.belongsToMany(doctors, {
  through:doctorsPatients,
  allowNull: false,
  primaryKey: 'doctor_patient'}
)

const treatments =require('./treatments.js')(sequelize,Sequelize)

patients.hasMany(treatments, {
  foreignKey: {
    name: 'patient_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    unique: 'nurse_patient_date'
  }, sourceKey: 'id'
})
treatments.belongsTo(patients, {foreignKey:'patient_id', targetKey:'id'})

nurses.hasMany(treatments, {
  foreignKey: {
    name: 'nurse_id',
    type:Sequelize.INTEGER,
    allowNull: false,
    unique: 'nurse_patient_date'
  }, sourceKey: 'id'
})
treatments.belongsTo(nurses, {foreignKey:'patient_id', targetKey:'id'})



const users=require('./users.js')(sequelize,Sequelize, doctors)

//sequelize.sync({force:true}).then(()=>console.log("Tebles are Created"))


module.exports={
    sequelize,
    departments,
    departmentsPhones,
    doctors,
    doctorsPhones,
    headDoctors,
    nurses,
    nursesPhones,
    patients,
    patientsPhones,
    doctorsPatients,
    treatments,
    users
}
  




