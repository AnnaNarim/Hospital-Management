const Sequelize=require('sequelize')
const patients=require('../schemas/db').patients
const doctors= require('../schemas/db').doctors
const treatments=require('../schemas/db').treatments
const Op=Sequelize.Op
const _=require('lodash')

module.exports={
     getMyPatients: async (doct_id)=>{

         let PatientsIDs= await treatments.findAll({
             attributes: [Sequelize.fn('DISTINCT', Sequelize.col('patient_id')), 'patient_id'],
             where: { doctor_id: doct_id}
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
    

    listingDoctorsAndTreatmentsOfPatien: async(patient) =>
    {
        let doctorsTreatingID = await treatments.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('doctor_id')), 'doctor_id']],
            where: {patient_id: patient},
            raw:true
        })

        doctorsTreatingID = doctorsTreatingID.map(doct => doct.doctor_id)

        const doctorsTreating=await doctors.findAll({
            attributes: ['id', [Sequelize.fn('CONCAT', Sequelize.col('firstName'), ' ',  Sequelize.col('lastName')), 'DoctorName']],
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

        doctorWithTreatment=doctorWithTreatment.map(({ DoctorName, start_date, notes }) => ({
            DoctorName ,
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
