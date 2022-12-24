const {
    DataTypes,
    UUIDV4
} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('chat', {
        room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remitente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receptor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mensaje: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};