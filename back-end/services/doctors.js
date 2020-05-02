const Sequelize=require('sequelize')
const doctors=require('../schemas/db').doctors
const doctorsNurses=require('../schemas/db').doctorsNurses
const patients= require('../schemas/db').patients
const treatments =require('../schemas/db').treatments
const IncorrectNurse= require('../errors/errors').IncorrectNurse
const RepeatedTreatment=require('../errors/errors').RepeatedTreatment
const Op=Sequelize.Op

module.exports={

    getDoctorID: (doctEmail)=>{
        return doctors.findAll({
            attributes:[ 'id'],
            where: {
                email: doctEmail
            },
            raw:true
        })

    },

    getMyPatients: async (doctId)=>{

        let PatientsIDs= await treatments.findAll({
            attributes: [Sequelize.fn('DISTINCT', Sequelize.col('patient_id')), 'patient_id'],
            where: { doctor_id: doctId}
        })

        PatientsIDs = PatientsIDs.map(a => a.patient_id)

        return patients.findAll({
           attributes: ['id','firstName', 'lastName'],
           where: { 
               id: { [Op.in]: PatientsIDs }
           },
           raw:true
       }) 
   },
    
    getDoctorsPersonalInfo: (doctId)=>{
        return doctors.findAll({
            attributes: { exclude: ['id', 'gender']},
            where: { id: doctId},
            raw:true
        })
    },
  
    numOfNursesOfDoctor: (doctId)=>{
        return doctorsNurses.count({
            where: {
                doctor_id: doctId
            }
        })
    },

    numOfPatientsOfDoctor: (doctId)=>{
        return treatments.count(
            {
                distinct:true, 
                col: 'patient_id',
                where: {
                doctor_id: doctId ,
            }
        })
    },

    addNurse: async (doctId, nurseId)=>{
        const check = await doctorsNurses.findAll({
            where: { 
                [Op.and]: [
                { doctor_id: doctId },
                { nurse_id:  nurseId }]
            }
        })

        if(check.length==0){
            await doctorsNurses.create({ doctor_id: doctId, nurse_id: nurseId})
        return 1
        } throw new IncorrectNurse()
    },

    deleteNurse: async (doctId, nurseId)=>{
       await doctorsNurses.destroy({
            where: { 
                [Op.and]: [
                    { doctor_id:doctId},
                    { nurse_id:nurseId}
                ]
            }
        })
        return 1
    },

    addTreatment: async ( doctId, patId, startDate, treatment)=>{
        const check = await treatments.findAll({
            where: { 
                [Op.and]: [
                { doctor_id: doctId },
                { patient_id: patId },
                { start_date: startDate}]
            }
        })

        if(check.length==0){
            await treatments.create({doctor_id: doctId ,patient_id:patId, start_date: startDate, notes: treatment})
            return 1
        } throw new RepeatedTreatment()
    }
}

