module.exports = (sequelize, DataTypes) => {
    
    const departments= sequelize.define('departments',{
        name:{
            type: DataTypes.STRING,
            primaryKey:true
        },
        location:{
            type: DataTypes.STRING,
            allownull: false
        },
        phoneNumber:{
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
         }
    },
        {
            freezeTableName: true ,
            timestamps: false
        }
    )
    return departments
}









