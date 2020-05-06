const Sequelize=require('sequelize')
const patients=require('../schemas/db').patients
const doctors= require('../schemas/db').doctors
const treatments=require('../schemas/db').treatments
const Op=Sequelize.Op
const _=require('lodash')

module.exports={
    getPersonalInfoOfPatient: (patient)=>{
        return patients.findAll({
            attributes: { exclude: ['id', 'gender']},
            where: { id:patient},
            raw:true
        })
    },

    getNumOfDoctorsCuringPatient: async (patient) =>{
        const docts=await treatments.findAll({
            attributes: [ [Sequelize.fn('DISTINCT', Sequelize.col('doctor_id')), 'GettingTreatmentWith']],
            where: {patient_id: patient},
            raw:true
        })
        return docts.length
    },
    

    listingDoctorsAndTreatmentsOfPatient: async(patient) =>
    {
        let doctorsTreatingID = await treatments.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('doctor_id')), 'doctor_id']],
            where: {patient_id: patient},
            raw:true
        })

        doctorsTreatingID = doctorsTreatingID.map(doct => doct.doctor_id)

        const doctorsTreating=await doctors.findAll({
            attributes: ['id','email', [Sequelize.fn('CONCAT', Sequelize.col('firstName'), ' ',  Sequelize.col('lastName')), 'DoctorName']],
            where: { 
                id: { [Op.in]: doctorsTreatingID }
            },
            raw:true
        })

        const patientsTreatments =await treatments.findAll({
            attributes: ['doctor_id', 'start_date', 'notes'],
            where: { patient_id: patient},
            raw: true
        })

        let doctorWithTreatment =_.map(patientsTreatments, function(obj) {
            return _.assign(obj, _.find(doctorsTreating, {id: obj.doctor_id}));
        });

        doctorWithTreatment=doctorWithTreatment.map(({ DoctorName, email, start_date, notes }) => ({
            DoctorName ,
            email,
            start_date, 
            notes 
          }));

        return doctorWithTreatment
    },

    getPatientsMails: ()=>{
        return patients.findAll({
            attributes: ['id','email'],
            raw:true
        })
    }
    
}
