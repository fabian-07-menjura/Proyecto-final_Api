const { Alumno, Country, Fechas, Profesor } = require("../db.js");

const createAlumno = async (req, res) => {
  //hicimos cambios desde fabian menjura
  const { id, name, lastname, picture, age, email, country, username, promo} =
    req.body;
  console.log(id);
  try {
    console.log(country[0].toUpperCase() + country.substring(1));
    let pais = await Country.findOne({
      where: { name: country[0].toUpperCase() + country.substring(1) },
    });
    console.log("este es el pais encontrado ", pais.id);
    const [objAlumno, created] = await Alumno.findOrCreate({
      where: { email },
      defaults: {
        id,
        tipo: "estudiante",
        name,
        lastname,
        picture,
        age,
        email,
        countryId: pais.id,
        username,
        promo,
      },
    });
    if (created) {
      res.status(200).send("alumno creado con exito");
    } else res.send("error al crear el alumno");
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const getAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    let alumno = await Alumno.findOne({
      where: { id },
      include: [
        { model: Country },
        {
          model: Fechas,
          attributes: ["fecha","hora"],
          through: {
            attributes: []
          },
          include: [
            {
              model:Profesor,
              attributes: ["id","nombre","apellido","imagen"],
              through: {
                attributes:[]
              }
            }
          ]
        }
      ],
    });

    if(alumno){

      res.status(200).send(alumno);
    }else{
      res.status(400).send('Alumno no encontrado.')
    }


  } catch (err) {
    res.status(400).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const getAllAlumnos = async (req, res) => {
  return Alumno.findAll({
    include: [
      {
        model: Fechas,
        attributes: ["fecha","hora"],
        through: {
          attributes: []
        }
      } 
    ]
  })
    .then((alumnos) => {
      res.send(alumnos);
    })
    .catch((err) => {
      res.status(400).send({ msg: "Error en el servidor: ", err: err.message });
    });
};

const editAlumno = async (req, res) => {
  console.log('editar alu')
  console.log(req.body)
  try {
    const { id } = req.params;
    const { name,
          lastname, 
          age,
          picture,
          email,
          country,
          favourites,
          baneado,
          fechaLimiteBan,
          promo,
          razon } = req.body;
          
    const findAlumno = await Alumno.findByPk(id);
 
    var fields = {};
 
    if(favourites) fields.favourites =favourites;
    if (name) fields.name = name;
    if (lastname) fields.lastname = lastname;
    if (age) fields.age = age;
    if (picture) fields.picture = picture;
    if (email) fields.email = email;
    if(baneado===true || baneado===false) fields.baneado=baneado;
    if(fechaLimiteBan) fields.fechaLimiteBan=fechaLimiteBan;
    if(razon) fields.razon=razon;
    if(promo === true || promo ===false) fields.promo = promo;
    if (country) {
      let pais = await Country.findOne({
        where: { name: country[0].toUpperCase() + country.substring(1) },
      });
      if (pais) {
        fields.countryId = pais.id;
      }
    }
    console.log(fields);
    if (fields === {})
      throw new Error("No se recibieron parametros para cambiar");

    if (findAlumno) {
      await findAlumno.update(fields);

      res.status(200).send("Cambios guardados");
    } else {
      throw new Error(
        "No se ha encontrado una categoria existente con el id ingresado."
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(fields);
  }
};

const deleteAlumno = async (req, res) => {
  try {
    let { id } = req.params;
    let buscarName = await Alumno.findByPk(id);
    if (!buscarName) throw new Error("No se encontro el alumno");

    await buscarName.destroy();
    res.status(200).send("alumno eliminado exitosamente");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createAlumno,
  getAlumno,
  getAllAlumnos,
  deleteAlumno,
  editAlumno,
};
