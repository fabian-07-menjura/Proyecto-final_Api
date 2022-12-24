const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('certificado', {

    // id:{
    //   type:DataTypes.INTEGER,
    //   autoIncrement:true,
    //   allowNull: false,
    //   primaryKey: true
    // },

    nombre: {
        type:DataTypes.STRING,
        allowNull: null   
      },
    foto:{
        type: DataTypes.TEXT,
    }

  },{timestamps: false});
};
