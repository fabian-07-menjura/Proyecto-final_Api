const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('puntuacion', {
    puntaje: {
          type:DataTypes.INTEGER,
          validate: {
            min: 1,
            max: 5,
          },
       },
  

  },{timestamps: false});
};
