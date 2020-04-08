module.exports = (sequelize, DataTypes) => {
    
    const departments= sequelize.define('departments',{
        name:{
            type: DataTypes.STRING,
            unique: true,
            allownull: false 
        },
        location:{
            type: DataTypes.STRING,
            allownull: false
        }},
        {
            freezeTableName: true ,
            timestamps: false
        }
    )
    return departments
}









