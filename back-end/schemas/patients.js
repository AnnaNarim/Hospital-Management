module.exports = (sequelize, DataTypes) => {

    const patients= sequelize.define('patients',{
        //primary key is auto generated id
        firstName:{
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
            type: DataTypes.STRING,
            allowNull:false
        },
        streetName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        apartmentNumber:{
            type: DataTypes.STRING,
            allowNull:false
        },
        phoneNumber:{
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        picture:{
        type:DataTypes.STRING,
        allowNull:false
        }
    },
        {
        timestamps: false
        }
    )
    return patients

}