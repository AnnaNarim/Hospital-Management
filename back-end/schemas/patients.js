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
            type: DataTypes.DATE,
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
        }
    },
        {
        timestamps: false
        }
    )
    return patients

}