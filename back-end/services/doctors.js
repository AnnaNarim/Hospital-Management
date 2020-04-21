const Sequelize=require('sequelize')
const doctors=require('../schemas/db').doctors
const doctorsNurses=require('../schemas/db').doctorsNurses
const treatments =require('../schemas/db').treatments
const Op=Sequelize.Op

module.exports={
    
    numOfNursesOfDoctor: (doct_id)=>{
        return doctorsNurses.count({
            where: {
                doctor_id: doct_id
            }
        })
    },

    numOfPatientsOfDoctor: (doct_id)=>{
        return treatments.count(
            {distinct:true,
             col: 'patient_id',
            where: {
                doctor_id: doct_id ,
            }
            }
        )
    },

    getDoctorID: (doct_email)=>{
        return doctors.findAll({
            attributes:[ 'id'],
            where: {
                email: doct_email
            },
            raw:true
        })

    }
}

