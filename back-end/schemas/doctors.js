module.exports = (sequelize, DataTypes) => {

    const doctors= sequelize.define('doctors',{
        //primary key is auto generated id
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
            //trim:true
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
        roomNumber:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'location'
        }
        //,
        //chem avelacnum onDelete Cascade, vorovhetev ete deprtment@ pakum en petq chi
        //doctornernel hanel, aranc notification
        // department_id: {
        //     references: {
        //         model: departments,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    },
        {
           freezeTableName: true,
           timestamps: false
        }
    )
    return doctors;
}

