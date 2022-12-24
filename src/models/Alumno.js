const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("alumno", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    favourites:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    baneado:{
      type:  DataTypes.BOOLEAN,
        defaultValue: false,
    },
    fechaLimiteBan:{
      type:DataTypes.DATEONLY
    },
    razon:{
      type:DataTypes.STRING,
    },
    promo:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }

  },{timestamps: false});
};
