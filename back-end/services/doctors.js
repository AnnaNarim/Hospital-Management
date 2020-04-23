const Sequelize=require('sequelize')
const doctors=require('../schemas/db').doctors
const doctorsNurses=require('../schemas/db').doctorsNurses
const treatments =require('../schemas/db').treatments
const IncorrectNurse= require('../errors/errors').IncorrectNurse
const Op=Sequelize.Op

module.exports={

    getDoctorID: (doct_email)=>{
        return doctors.findAll({
            attributes:[ 'id'],
            where: {
                email: doct_email
            },
            raw:true
        })

    },
    
    getDoctorsPersonalInfo: (doct_id)=>{
        return doctors.findAll({
            attributes: { exclude: ['id', 'gender']},
            where: { id: doct_id},
            raw:true
        })

    },
  
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

    addNurse: async (doct_id, n_id)=>{
       
        const check = await doctorsNurses.findAll({
            where: { 
                [Op.and]: [
                { doctor_id: doct_id },
                { nurse_id:  n_id }
              ]
            }
        })

        if(check.length==0){
            await doctorsNurses.create({ doctor_id: doct_id, nurse_id: n_id})
        return 
        }throw new IncorrectNurse()
    },

    deleteNurse: async (doct_id, n_id)=>{
       await doctorsNurses.destroy({
            where: { 
                [Op.and]: [
                    { doctor_id:doct_id},
                    {nurse_id:n_id}
            ]
        }
    })
        return
    },

    addTreatment: async ( doct_id, pat_id, startDate, treatment)=>{
        await treatments.create({doctor_id: doct_id ,patient_id:pat_id, start_date:startDate, notes: treatment})
        return
    }
}

