const { Materias } = require("../db.js");

const getAllMaterias = async (req, res) => {
  try {

    let allMaterias = await Materias.findAll()
    if (!allMaterias.length){
      const arr1 =  [
         'algebra','aritmética','geometría' ,'trigonometría', 
        'biología', 'quimica', 'fisica',
        'geografía','economía', 'historia',
         'arte','música',
         'literatura','lenguaje',
         'filosofía','psicología',
         'ingles','computación'
       
      ]
      for(let i = 0; i < arr1.length; i++){
        await Materias.create({ name: arr1[i] })

      }
      allMaterias = await Materias.findAll();
      return res.status(200).json(allMaterias);
    } else res.status(200).json(allMaterias);
  } catch (err) {
    res.status(400).send({ msg: "Error en el servidor: ", err: err.message });
  }
};

const createMaterias = async (req, res) => {
  try {
    const { name } = req.body;

    const [materias, created] = await Materias.findOrCreate({
      where: { name: name.toLowerCase() },
    });
    if (!materias) throw new Error("No se pudo crear la materia");
    const createdMsg = created
      ? "Materia creada exitosamente"
      : "materia ya existente";
    res.status(200).send({
      msg: createdMsg,
      Materias: name,
    });
  } catch (err) {
    res.status(400).send({ msg: "Erorr en el servidor: ", err: err.message });
  }
};

const deleteMaterias = async (req, res) => {     
  try {
    let { id } = req.params;
    let buscarName = await Materias.findByPk(id);
    if (!buscarName) throw new Error("No se encontro la materia");

    await buscarName.destroy();
    res.status(200).json({ msg: "Se elimino la materia" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error en el servidor: ", error: error.message });
  }
};

const editMaterias = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const findMaterias = await Materias.findByPk(id);
    if (findMaterias) {
      const MateriasEdited = await Materias.update(
        {
          name: name.toLowerCase(),
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json("Cambios guardados");
    } else {
      throw new Error(
        "No se ha encontrado una categoria existente con el id ingresado."
      );
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("hubo un error");
  }
};

module.exports = {
  createMaterias,
  getAllMaterias,
  deleteMaterias,
  editMaterias,
};
