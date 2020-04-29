const express = require('express');
const router = express.Router();
const Sequelize=require('sequelize')
const asyncHandler = require('express-async-handler');
const passport=require('passport')

const departments=require('../services/departments')
const doctors =require('../services/doctors')
const nurses =require('../services/nurses')
const patients =require('../services/patients')

router.get('/', passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res) => {
    //giving current number of patients and nurses under doctors responsibility 
    const doctID=await doctors.getDoctorID(req.user.email)
    const numOfDoctorsNurses =await doctors.numOfNursesOfDoctor(doctID[0].id)
    const numOfDoctorsPatients =await doctors.numOfPatientsOfDoctor(doctID[0].id)
    //the lower part showing all info about departments
    const departmentsInfo =await departments.getAllDepartmentsInfo()
    res.status(200).json(
        {
            NursesUnderMyResponsibility: numOfDoctorsNurses ,
            PatientsUnderMyResponsibility: numOfDoctorsPatients,
            AllDepartmentsInfo: departmentsInfo
    })
}));

//viewing all personal nurses
router.get('/myNurses/view', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctID=await doctors.getDoctorID(req.user.email)
    const myNurses = await nurses.getMyNurses(doctID[0].id)
    res.status(200).json(myNurses)
  
}))

//vieing info of nurse
router.get('/myNurses/view/:id', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const nursesPersonalnfo = await nurses.getPersonalInfoOfNurse(req.params.id)
    const numOfNursesDoctors =await nurses.getNumOfDoctorsNurseIsWorkingWith(req.params.id)
    const nursesDoctors = await nurses.listDoctorsOfNurse(req.params.id)
    res.status(200).json({
        nursesPersonalnfo,
        numOfNursesDoctors, 
        WorkingWithDoctors: nursesDoctors})
  
}))

//deleteing personal nurse
router.post('/myNurses/delete/:nurseid', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctID=await doctors.getDoctorID(req.user.email)
    doctors.deleteNurse(doctID, req.params.nurseid)
    res.status(200).send('Nurse is deleted!')
}))

//adding nurse
router.get('/myNurses/add/:deptname' , passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const nursesMails =await nurses.getMailsOfNursesInDepartment(req.params.deptname)
    res.status(200).json(nursesMails)  
})) 

router.post('/myNurses/add/:nurseid', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctID=await doctors.getDoctorID(req.user.email)
    doctors.addNurse(doctID[0].id, req.params.nurseid)
    res.status(201).send('Nurse is added!')
})) 

//viewing all patients
router.get('/myPatients/view', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctID=await doctors.getDoctorID(req.user.email)
    const myPatients = await doctors.getMyPatients(doctID[0].id)
    res.status(200).json(myPatients)
  
}))

//viewing specific patient
router.get('/myPatients/view/:id', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const patientsPersonalnfo = await patients.getPersonalInfoOfPatient(req.params.id)
    const numOfPatientsDoctors =await patients.getNumOfDoctorsCuringPatient(req.params.id)
    const doctorsAndTreatmentsOfPatient = await patients.listingDoctorsAndTreatmentsOfPatient(req.params.id)
    res.status(200).json({patientsPersonalnfo, numOfPatientsDoctors, doctorsAndTreatmentsOfPatient})
  
}))

//adding patient
router.get('/myPatients/add' , passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const patientsMailsandIDs =await patients.getPatientsMails()
    res.status(200).json(patientsMailsandIDs)  
})) 

router.post('/myPatients/add/:patientId', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctID=await doctors.getDoctorID(req.user.email)
    doctors.addTreatment(doctID[0].id, req.params.patientId, req.body.startDate, req.body.treatment)
    res.status(201).send('Treatment is added!')
})) 

//viewing doctors in specific department
router.get('/departments/:name/doctors', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctorsInDepartment =await departments.getDoctorsInDepartment(req.params.name)
    res.status(200).json(doctorsInDepartment)
    
}))

router.get('/departments/doctors/:id', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const doctorsPersonalInfo =await doctors.getDoctorsPersonalInfo(req.params.id)
    const numOfPatients =await doctors.numOfPatientsOfDoctor(req.params.id)
    const numberOfNurses =await doctors.numOfNursesOfDoctor(req.params.id)
    res.status(200).json({ 
        PersonalInfo: doctorsPersonalInfo ,
        NumberOfPatients: numOfPatients,
        NumberOfNurses: numberOfNurses
    })
    
}))

//viewing nurses in specific department
router.get('/departments/:name/nurses', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const nursesInDepartment =await departments.getNursesInDepartment(req.params.name)
    res.status(200).json(nursesInDepartment)
    
}))

router.get('/departments/nurses/:id', passport.authenticate('jwt', {session:false}) , asyncHandler(async (req,res)=>{
    const nursesPersonalInfo =await nurses.getPersonalInfoOfNurse(req.params.id)
    const WorkingWithDoctors =await nurses.listDoctorsOfNurse(req.params.id)
    res.status(200).json({ 
        PersonalInfo: nursesPersonalInfo,
        WorkingWithDoctors: WorkingWithDoctors
    })
    
}))

module.exports=router

