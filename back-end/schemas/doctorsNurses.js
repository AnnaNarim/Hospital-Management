module.exports = (sequelize, DataTypes) => {

    const doctorsNurses= sequelize.define('doctors_nurses',{
    }, 
    {
        timestamps:false
    })

    return doctorsNurses

}