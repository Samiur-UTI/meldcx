const User = function (sequelize, DataTypes) {

    return sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                validate: {
                    notEmpty: true
                }
            },
            ip:{
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            uploaded:{
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            downloaded:{
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false,
            underscored: true
        });
};
module.exports = User;