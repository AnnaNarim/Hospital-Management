module.exports = (sequelize, DataTypes) => {
    
    const doctorsPatients= sequelize.define('doctors_patients',{
        start_date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        end_date:{
            type:DataTypes.DATE
        }
        // ,
        // doctor_id:{
        //     references: {
        //         model: doctors,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: 'doctor_patient'
        // },
        // patient_id:{
        //     references: {
        //         model: patients,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: 'doctor_patient'
        // }
    },
        {
            timestamps: false
        }
    )
    return doctorsPatients
}