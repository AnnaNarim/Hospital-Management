const Sequelize=require('sequelize')
const doctors=require('../schemas/db').doctors
const nurses=require('../schemas/db').nurses
const doctorsPatients=require('../schemas/db').doctorsPatients
const Op=Sequelize.Op

module.exports={
    getDoctorsByDepartmentId: (dep_id)=>{
        doctors.findAll({
            attributes: ['firstName','middleName','lastName','DOB','email','city','roomNumber' ],
            where: {
                department_id: dep_id
            }
        })
    },

    numOfNursesOfDoctor: (doct_id)=>{
        return nurses.count({
            where: {
                doctor_id: doct_id
            }
        })
    },

    numOfPatientsOfDoctor: (doct_id)=>{
        return doctorsPatients.count({
            where: {
                doctor_id: doct_id ,
                end_date: {[Op.gte]: sequelize.literal('CURRENT_TIMESTAMP')}

            }
        })
    },

    getDoctorID: (doct_email)=>{
        return doctors.findOne({
            attributes:[ 'id'],
            where: {
                email: doct_email
            },
            raw:true
        })

    }
}

