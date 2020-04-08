module.exports = (sequelize, DataTypes) => {

    const headDoctors=sequelize.define('head_doctors',
    // {
        // doctor_id:{
        //     references: {
        //         model: doctors,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     primaryKey: 'head_doctor',
        //     onDelete: 'CASCADE' //ete doctor@ heracvac e, inq@ chi karoxa headdoctor mnal

        // },
        // department_id:{
        //     references: {
        //         model: departments,
        //         key: 'id'
        //     },
        //     type: DataTypes.INTEGER,
        //     unique:true,
        //     allowNull: false,
        //     primaryKey: 'head_doctor',
        //     onDelete: 'CASCADE' //ete departmenta pakvum, chi karox head doctor mnal
        // }},
        {},
        {
            freezeTableName: true,
            timestamps: false 
        })
    headDoctors.removeAttribute('id');
        
    return headDoctors;
}
