module.exports = (sequelize, DataTypes) => {

    const nursesPhones= sequelize.define('nurses_phone',{
        phoneNumber:{
            type: DataTypes.STRING,
            primaryKey: 'nurse_phone',
            allowNull: false,
            unique: true
        // },
        // nurse_id:{
        //     references: {
        //         model: nurses,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: 'nurse_phone',
        //     onDelete: 'CASCADE'
        // }
    }},
        {
            freezeTableName: true ,
            timestamps: false 
        }
    )
    return nursesPhones
}