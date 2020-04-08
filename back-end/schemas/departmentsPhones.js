module.exports = (sequelize, DataTypes) => {

    const departmentsPhones= sequelize.define('departments_phone',{
        phoneNumber:{
            type: DataTypes.STRING,
            primaryKey: 'department_phone',
            allowNull: false,
            unique: true
         }
        // department_id:{
        //     references: {
        //         model: departments,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: 'department_phone',
        //     onDelete: 'CASCADE'
        // }
    },{
            freezeTableName: true ,
            timestamps: false 
    })
    return departmentsPhones
}