module.exports = (sequelize, DataTypes) => {

    const doctorsPhones= sequelize.define('doctors_phone',{
        phoneNumber:{
            type: DataTypes.STRING,
            primaryKey: 'doctor_phone',
            allowNull: false,
            unique: true
        }
        // ,
        // doctor_id:{
        //     references: {
        //         model: doctors,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: 'doctor_phone',
        //     onDelete: 'CASCADE' //ete bjisk@ heracvec, petq chi ira infon pahel
        // }
    },{
            freezeTableName: true ,
            timestamps: false 
    })
    return doctorsPhones
}