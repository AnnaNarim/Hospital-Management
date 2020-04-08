const Sequelize=require('sequelize')
const Doctors=require('../schemas/db').Doctors

module.exports={
    getDoctorsByDepartmentId: (dep_id)=>{
        Doctors.findAll({
            attributes: ['firstName','middleName','lastName','DOB','email','city','roomNumber' ],
            where: {
                department_id: dep_id
            }
        })
    }

}

