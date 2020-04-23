const Sequelize=require('sequelize')
const sequelize=require('../schemas/db').sequelize
const departments=require('../schemas/db').departments
const doctors=require('../schemas/db').doctors
const treatments=require('../schemas/db').treatments
const doctorsNurses=require('../schemas/db').doctorsNurses
const nurses =require('../schemas/db').nurses
const patients=require('../schemas/db').patients
const Op= Sequelize.Op
const _  =require('lodash')



const getIDsOfNursesInDepartment = async (dept_name) =>{
    let IdsOfdoctorsInDept = await doctors.findAll({
        attributes: ['id'],
        where: { department_name: dept_name},
        raw:true
    })

    IdsOfdoctorsInDept= IdsOfdoctorsInDept.map(element => element.id)

    let nursesIDs = await doctorsNurses.findAll({
        attributes: [Sequelize.fn('DISTINCT', Sequelize.col('nurse_id')), 'nurse_id'],
        where: { doctor_id: {[Op.in]: IdsOfdoctorsInDept} }
    })

    nursesIDs = nursesIDs.map(a => a.nurse_id)

    return nursesIDs
}

module.exports={
    
    getAllDepartmentsInfo: async ()=>{

        const numOfDoctorsInDept= await  departments.findAll({
            attributes: ['name' ,  [Sequelize.fn('count', Sequelize.col('doctors.id')), 'NumberOfDoctors']],
            include: [{
                model:doctors,
                attributes: []
            }],
            group: ['departments.name'],
            raw:true
        })

        const numOfNursesInDept = await  sequelize.query("select departments.name, count(num_nurse.nurse_id) as NumberOfNurses from departments LEFT OUTER JOIN ( select doctors.department_name, doctors_nurses.nurse_id from doctors, doctors_nurses where doctors.id=doctors_nurses.doctor_id ) as num_nurse on departments.name =num_nurse.department_name group by departments.name;",
        {type: Sequelize.QueryTypes.SELECT });


        const numOfPatientsInDept = await  sequelize.query("select departments.name, COUNT(t.patient_id) as NumberOfPatients from departments LEFT outer JOIN  (select doctors.department_name,treat.patient_id from doctors, (select distinct patient_id, doctor_id from treatments) as treat  where doctors.id=treat.doctor_id) as t  ON departments.name= t.department_name group by departments.name;",
        {type: Sequelize.QueryTypes.SELECT });

        const phoneAndPlaceOfDept = await departments.findAll({
            attributes:['name', 'location', 'phoneNumber'],
            raw:true
        })
        const headDoctOfDept= await sequelize.query("select head_doctors.department_name as name,  CONCAT(doctors.firstName, ' ',doctors.lastName) as headDoctor from head_doctors, doctors where  head_doctors.doctor_id =doctors.id;",
        {type: Sequelize.QueryTypes.SELECT })


        const add1 =_.map(numOfDoctorsInDept, function(obj) {
            return _.assign(obj, _.find(numOfNursesInDept, {name: obj.name}));
        });

        const add2 =_.map(add1, function(obj) {
            return _.assign(obj, _.find(numOfPatientsInDept, {name: obj.name}));
        });

        const add3 =_.map(add2, function(obj) {
            return _.assign(obj, _.find(phoneAndPlaceOfDept, {name: obj.name}));
        });

        const add4 =_.map(add3, function(obj) {
            return _.assign(obj, _.find(headDoctOfDept, {name: obj.name}));
        });

        return  add4
    },

    getDoctorsInDepartment: (dept_name)=>{
        return doctors.findAll({
            attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('firstName'), ' ',  Sequelize.col('lastName')), 'DoctorName']],
            where: { department_name: dept_name},
            raw:true
        })
    },

    getNursesInDepartment: async (dept_name)=>{
        const IdsOfNursesInDept = await getIDsOfNursesInDepartment(dept_name)

        const nursesNames= nurses.findAll({
            attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('firstName'), ' ',  Sequelize.col('lastName')), 'NurseName']],
            where: { id: { [Op.in]: IdsOfNursesInDept}}
        })
         
        return nursesNames
    }, 
    getIDsOfNursesInDepartment
}


        // return departments.findAll({ 
        //     attributes: ['name', [Sequelize.fn('count', Sequelize.col('doctors.id')), 'NumberOfNurses']],
        //     include: [{
        //         attributes: [],
        //         model:doctors,
        //         include:[{
        //             required:true,
        //             attributes: [],
        //             model:doctorsNurses         
        //         }]
        //         }],
        //     group: ['departments.name'],
        //     raw:true
        // })

        
        // doctors.findAll({ 
        //     attributes: ['department_name', [Sequelize.fn('count', Sequelize.col('nurses.id')), 'NumberOfNurses']],
        //     include: [{
        //         attributes: [],
        //         model:nurses, 
        //         through: { attributes:[]} 
        //         }],
        //     group: ['doctors.department_name'],
        //     raw:true
        // })

        // const NursesInDep= await departments.findAll({
        //     attributes: ['name', [Sequelize.fn('count', Sequelize.col('doctors.nurses.id')),'NumberOfNurses']],
        //     include: [{
        //         attributes: [],
        //         model:doctors,
        //         include: [{
        //             attributes: [],
        //             model:nurses
        //             }] 
        //     }],
        //     group: ['departments.name'],
        //     raw:true
        // })
