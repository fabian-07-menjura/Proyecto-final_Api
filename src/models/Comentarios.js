const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('coments', {

    // id:{
    //   type:DataTypes.INTEGER,
    //   autoIncrement:true,
    //   allowNull: false,
    //   primaryKey: true
    // },

    contenido: {
        type:DataTypes.STRING,
        allowNull: null   
      },
    likes:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    }
  },{timestamps: false});
};
