const Sequelize=require('sequelize')
const departments=require('../schemas/db').departments
const departmentsPhones=require('../schemas/db').departmentsPhones

//JOINI PAHNA PETQ STGUEL< DEPARTMENT PHONES AVELACREL< AUTHI PAH@ EREKVA AVELACRAC
module.exports={
    //list all departments' names ,locations, and phone numbers
    getDepartments:()=>{
        return departments.findAll({
        attributes: ['name', 'location'],
        include:[{ //left outer joina
            model:departmentsPhones,
            attributes: 'phoneNumber'
        }]})
    },

    //given the department name, phone number, list head doctor,  all doctors
    getDepartmentInfo: (departmentName)=>{
         const dep_id=departments.findOne({
            attributes: ['id'],
            where: {
                name: departmentName
            }});
        
        
        
    }

}