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
            fileName: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            filePath: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            fileSize: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            publicKey:{
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            privateKey:{
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            createdAt: {
                type: DataTypes.DATETIME,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: true
                }
            },
            updatedAt: {
                type: DataTypes.DATETIME,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            tableName: 'file_details',
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
