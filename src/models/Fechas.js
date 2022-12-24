const {DataTypes} = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("fechas", {
        fecha:{
            type: DataTypes.STRING,
            allowNull:false
        },
        hora:{
            type:DataTypes.STRING,
            allowNull:false
        },
        habilitado:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:true
        }
    })
}