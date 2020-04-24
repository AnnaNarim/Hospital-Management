module.exports = (sequelize, DataTypes) => {
    const treatments =sequelize.define('treatments', {
        notes:{
            type: DataTypes.TEXT
        },
        start_date:{
            type:DataTypes.DATEONLY, 
            allowNull: false
        }
    },{
        timestamps: false
        }
    )
    return treatments
}