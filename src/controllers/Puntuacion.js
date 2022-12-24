const { Profesor, Alumno ,Puntuacion  } = require("../db");

const getAllPuntuaciones=async (req, res)=>{
    try {
          buscarPuntuaciones= await Puntuacion.findAll()
        
        if (buscarPuntuaciones.length>0){          
            res.status(200).json(buscarPuntuaciones);
        }
        if (buscarPuntuaciones.length===0){
            res.status(200).json({msg:'Sin Puntuacion que mostrar '});
        }
       
    } catch (error) {
        res.status(400).json(error)
    }
  }
  
  const getAllPuntByProfeID=async(req,res)=>{
    try {
      const {id}=req.params
      const findProfe=await Profesor.findByPk(id)
      if(findProfe){
        const buscarPuntuaciones= await Puntuacion.findAll({
          where:{
            profesorId:id
          }
        })
      
      if (buscarPuntuaciones.length>0){          
          res.status(200).json(buscarPuntuaciones);
      }
      if (buscarPuntuaciones.length===0){
          res.status(400).json({msg:'Sin Puntuacion que mostrar '});
      }
      }else{
        res.status(400).json({error:"No existe un profesor con ese id."})
      }
   
} catch (error) {
    res.status(400).json(error)
}
  }
  
    const createPuntuacion = async (req, res) => {
      try {
          
        const { puntaje, profesorId, alumnoId } = req.body;
        if (!alumnoId) throw new Error(" AlumnoId no puede ser nulo");
        const findAlumno = await Alumno.findByPk(alumnoId);
        if (!findAlumno) throw new Error("No se encuentra el alumno");
  
        if (!profesorId) throw new Error(" ProfesorId no puede ser nulo");
        const findProfe = await Profesor.findByPk(profesorId);
        if (!findProfe) throw new Error("No se encuentra el profesor");
        
        await Puntuacion.create({
          puntaje, profesorId, alumnoId
        });   
    
        // post.addReacciones(newPuntuacion);
    
        res.status(200).send({
          msg: "Puntuacion Creada Exitosamente"
        });
      } catch (err) {
        res.status(400).send({ err: err.message });
      }
    };
  
    const eliminarPuntuacion = async (req, res) => {
      console.log(req.params)
      
      try {
        const { id } = req.params; 
       
          await Puntuacion.destroy({
            where: {           
              id:id
            },
          });
          res.status(200).json({ msg: "Se elimino la Puntuacion" });
        
      } catch (error) {
        res.status(400).json({error: error})
      }
    };
  
    const editarPuntuacion = async (req, res) => {
      try {
          let { id } = req.params;
          const { puntaje } = req.body;
        const findReaccion = await Puntuacion.findByPk(id);
    
        if (findReaccion) {
           await Puntuacion.update(
            {
              puntaje
            },
            {
              where: {
                id: id,
              },
            }
          );
          res.status(200).json({
            msg: "Cambios guardados"
          });
        } else {
          res.status(400).json({
            error: 'Puntuacion no encontrada'
          })
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({error:error});
      }
    };
  
    
  module.exports = {getAllPuntuaciones,getAllPuntByProfeID,createPuntuacion,eliminarPuntuacion,editarPuntuacion}