module.exports = (sequelize, DataTypes) => {
    const patientsPhones= sequelize.define('patients_phone',{
        phoneNumber:{
            type: DataTypes.STRING,
            primaryKey: 'patient_phone',
            allowNull: false,
            unique: true
        },
        // patient_id:{
        //     references: {
        //         model: patients,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: 'patient_phone',
        //     onDelete: 'CASCADE'
        // }
    },{
            freezeTableName: true ,
            timestamps: false 
    })
    return patientsPhones
}