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

module.exports={
    
    getDepartmentInfo: async ()=>{

        const DoctorsInDept= await  departments.findAll({
            attributes: ['name' ,  [Sequelize.fn('count', Sequelize.col('doctors.id')), 'NumberOfDoctors']],
            include: [{
                model:doctors,
                attributes: []
            }],
            group: ['departments.name'],
            raw:true
        })

        const NursesInDep= await departments.findAll({
            attributes: ['name', [Sequelize.fn('count', Sequelize.col('doctors.nurses.id')),'NumberOfNurses']],
            include: [{
                attributes: [],
                model:doctors,
                include: [{
                    attributes: [],
                    model:nurses
                    }] 
            }],
            group: ['departments.name'],
            raw:true
        })

        const NursesInDept = [NursesInDep.name, NursesInDep.NumberOfNurses];

        const PatientsInDept = await  sequelize.query("select departments.name, COUNT(t.patient_id) as NumberOfPatients from departments LEFT outer JOIN  (select doctors.department_name,treat.patient_id from doctors, (select distinct patient_id, doctor_id from treatments) as treat  where doctors.id=treat.doctor_id) as t  ON departments.name= t.department_name group by departments.name;",
        {type: Sequelize.QueryTypes.SELECT });

        const PhoneAndPlace = await departments.findAll({
            attributes:['name', 'location', 'phoneNumber'],
            raw:true
        })
        const headDoct= await sequelize.query("select head_doctors.department_name as name,  CONCAT(doctors.firstName, ' ',doctors.lastName) as headDoctor from head_doctors, doctors where  head_doctors.doctor_id =doctors.id;",
        {type: Sequelize.QueryTypes.SELECT })


        const add1 =_.map(DoctorsInDept, function(obj) {
            return _.assign(obj, _.find(NursesInDept, {name: obj.name}));
        });

        const add2 =_.map(add1, function(obj) {
            return _.assign(obj, _.find(PatientsInDept, {name: obj.name}));
        });

        const add3 =_.map(add2, function(obj) {
            return _.assign(obj, _.find(PhoneAndPlace, {name: obj.name}));
        });

        const add4 =_.map(add3, function(obj) {
            return _.assign(obj, _.find(headDoct, {name: obj.name}));
        });

        return  add4
    }
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
