module.exports = (sequelize, DataTypes) => {
    const treatments =sequelize.define('treatments', {
        notes:{
            type: DataTypes.TEXT
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false,
            unique: 'nurse_patient_date'
        },
        //ete nurse a delete linum, mez petqa vor mna history te che
        // nurse_id:{
        //     references: {
        //         model: nurses,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: 'nurse_patient_date'
        // },
        // //nuyn@ patienti hamar
        // patient_id:{
        //     references: {
        //         model: patients,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: 'nurse_patient_date'
        // }
    },{
        timestamps: false
        }
    )
    return treatments
}