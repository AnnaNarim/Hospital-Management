module.exports = (sequelize, DataTypes, doctors) => {
//no need for room because we can find by doctor
    const nurses= sequelize.define('nurses',{
        firstName:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        middleName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false 
        },
        DOB:{
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
        gender:{
            type: DataTypes.ENUM,
            values: ['M', 'F', 'Other'] 
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        city:{
            type: DataTypes.STRING
        },
        streetName:{
            type: DataTypes.STRING
        },
        apartmentNumber:{
            type: DataTypes.STRING
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
    }},
        {
        freezeTableName:true,
        timestamps: false}
    )
    return nurses;
}