module.exports = (sequelize, DataTypes, doctors) => {
//no need for room because we can find by doctor
    const nurses= sequelize.define('nurses',{
    //primary key is auto generated id
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
        // doctor_id: {
        //     references: {
        //         model: doctors,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false 
        //     //on Delete cascade petq chi qani vor ete doctorin hanecin, xi nurserin el hanel
        // }
    },
        {
        freezeTableName:true,
        timestamps: false}
    )
    return nurses;
}