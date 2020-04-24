module.exports = (sequelize, DataTypes) => {

    const headDoctors=sequelize.define('head_doctors',
        {},
        {
            freezeTableName: true,
            timestamps: false 
        })
    headDoctors.removeAttribute('id');
        
    return headDoctors;
}
