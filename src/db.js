require("dotenv").config();
const { Sequelize, HasMany } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fyt`, {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Materias,
  Profesor,
  Alumno,
  Country,
  Coments,
  Puntuacion,
  Certificado,
  Fechas,
  Notificaciones,
} = sequelize.models;
console.log(sequelize.models);
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Profesor.belongsToMany(Materias, { through: "Profesor-Materias" });
Materias.belongsToMany(Profesor, { through: "Profesor-Materias" });

////////////alumnos a profesores////////////

///////////alumnos a paises//////////////////

Country.hasMany(Alumno);
Alumno.belongsTo(Country);

///////////profesor - paises//////////////////

Country.hasMany(Profesor);
Profesor.belongsTo(Country);

Alumno.hasMany(Coments);
Coments.belongsTo(Alumno);

Profesor.hasMany(Coments);
Coments.belongsTo(Profesor);

Coments.hasMany(Coments);
Coments.belongsTo(Coments);

Alumno.hasMany(Puntuacion);
Puntuacion.belongsTo(Alumno);

Profesor.hasMany(Puntuacion);
Puntuacion.belongsTo(Profesor);

Profesor.hasMany(Certificado);
Certificado.belongsTo(Profesor);

Profesor.belongsToMany(Fechas, { through: "Profesor-Fecha" });
Fechas.belongsToMany(Profesor, { through: "Profesor-Fecha" });

Alumno.belongsToMany(Fechas, { through: "Alumno-Fecha" });
Fechas.belongsToMany(Alumno, { through: "Alumno-Fecha" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
