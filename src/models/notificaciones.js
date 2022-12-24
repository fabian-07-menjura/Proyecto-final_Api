const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('notificaciones', {
   
    razon: {
        type:DataTypes.TEXT,
   
      },
    denuncianteId: {
        type:DataTypes.STRING,
   
      },
    denunciadoId: {
        type:DataTypes.STRING,
   
      },
    comentarioId: {
        type: DataTypes.INTEGER,
   
      },
    visto1:{
        type:  DataTypes.BOOLEAN,
        defaultValue: false,
    },
    visto2:{
        type:  DataTypes.BOOLEAN,
        defaultValue: false,
    },

  },{timestamps: false});
};