const Sequelize=require('sequelize')
const Op=Sequelize.Op
const nurses=require('../schemas/db').nurses
const doctors= require('../schemas/db').doctors
const doctorsNurses=require('../schemas/db').doctorsNurses
const getIDsOfNursesInDepartment =require('../services/departments').getIDsOfNursesInDepartment

module.exports={
    getMyNurses: (doct_id)=>{
        return nurses.findAll({
               attributes: ['nurses.id', 'nurses.firstName', 'nurses.lastName'],
               include:[{
                attributes: [],
                model: doctorsNurses,
                where: { doctor_id: doct_id} 
            }],
            raw:true
        })  
    },

    getPersonalInfoOfNurse: (nurse)=>{
        return nurses.findAll({
            attributes: { exclude: ['id', 'gender']},
            where: { id:nurse},
            raw:true
        })
    },
    
    getNumOfDoctorsNurseIsWorkingWith: (nurse) =>{
        return doctorsNurses.findAll({
            attributes: [ [Sequelize.fn('count', Sequelize.col('doctor_id')), 'WorkingWithDoctors']],
            where: { nurse_id: nurse},
            raw:true
        })

    },

    listDoctorsOfNurse: async  (nurse) =>{
        const DoctorsIds = await doctorsNurses.findAll({
            attributes: ['doctor_id'],
            where: { nurse_id: nurse},
            raw:true 
        })
        const  DoctIDs = DoctorsIds.map(a => a.doctor_id)

        return doctors.findAll({
            attributes: [[Sequelize.fn('CONCAT', Sequelize.col('firstName'), ' ',  Sequelize.col('lastName')), 'DoctorName'],'department_name'],
            where: { 
                id: { [Op.in]: DoctIDs }
            },
            raw:true
        })  
    },

    getMailsOfNursesInDepartment: async (dept_name)=>{
        const nursesIDs =await getIDsOfNursesInDepartment(dept_name)

        let nursesMails= nurses.findAll({
            attributes: ['id', 'email'],
            where: { id: { [Op.in]: nursesIDs}}
        })

        return nursesMails
    },

    addNurse: (mail)=>{

    }

}
