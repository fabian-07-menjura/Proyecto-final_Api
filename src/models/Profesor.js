const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("profesor", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    administrador:{
      type:  DataTypes.BOOLEAN,
        defaultValue: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    descripcion2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
      
    },
    email: {
      type: DataTypes.STRING,
      allowNulls: true,
    },

    precio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    puntuacion: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      validate: {
        min: 1,
        max: 5,
      },
      allowNull: true,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 10,
        max: 80,
      },
    },

    estudios:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
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
 

  },{timestamps: false});
};

