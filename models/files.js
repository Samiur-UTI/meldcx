const Files =  function (sequelize, DataTypes) {

    return sequelize.define('fileDetails', {
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
                },
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'ip'
                }
            },
            filename: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            filepath: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            filesize: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            publickey:{
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            privatekey:{
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            createdat: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: true
                }
            },
            updatedat: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            tableName: 'files',
            freezeTableName: true,
            timestamps: false,
            underscored: true
        });
};

//Association
Files.associate = function (models) {
    Files.belongsTo(models.users, {
        foreignKey: 'ip',
        targetKey: 'ip',
        as: 'user'
    });
}
module.exports = Files;
