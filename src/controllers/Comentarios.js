const { Profesor, Alumno ,Coments } = require("../db");

const createComent = async (req, res) => {
    try {
        
      const { contenido, profesorId, alumnoId } = req.body;
      if (!alumnoId) throw new Error("AlumnoId no puede ser nulo");
      const findAlumno = await Alumno.findByPk(alumnoId);
      if (!findAlumno) throw new Error("No se encuentra el alumno");

      if (!profesorId) throw new Error(" ProfesorId no puede ser nulo");
      const findProfesor = await Profesor.findByPk(profesorId);
      if (!findProfesor) throw new Error("No se encuentra el profesor");

      const newComent = await Coments.create({
        contenido, profesorId, alumnoId
      });
  
      
  
  
      res.status(200).send({
        msg: "Comentario Creado Exitosamente"
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  };


  const createComentonComent = async (req, res) => {
    try {
        
          const { comentId,contenido, alumnoId } = req.body;
          if(comentId){
              
      
              if (!alumnoId) throw new Error(" AlumnoId no puede ser nulo");
              const findAlumno = await Alumno.findByPk(alumnoId);
              if (!findAlumno) throw new Error("No se encuentra el alumno");           
  
              if (!comentId) throw new Error(" ComentId no puede ser nulo");
              const coment = await Coments.findByPk(comentId);
              if (!coment) throw new Error("No se encuentra el comentario");
              const newComent = await Coments.create({
                  contenido, comentId, alumnoId
              });
                
          
              // coment.addComents(newComent);
          
              res.status(200).send({
                  msg: "Comentario Creado Exitosamente"
              });
          }else{
            res.status(400).send({
              msg:"Comentario no encontrado"
            })
          }
        
        
      
    } catch (err) {
      res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
    }
  };


  const createComentonComentProfe = async (req, res) => {
    try {
       
          const { comentId,contenido, profesorId } = req.body;
          if(comentId){
              
      
              if (!profesorId) throw new Error(" profesorId no puede ser nulo");
              const finfProfe = await Profesor.findByPk(profesorId);
              if (!finfProfe) throw new Error("No se encuentra el profesor");           
  
              if (!comentId) throw new Error(" ComentId no puede ser nulo");
              const coment = await Coments.findByPk(comentId);
              if (!coment) throw new Error("No se encuentra el comentario");
              const newComent = await Coments.create({
                  contenido, comentId, profesorId
              });
                
          
              // coment.addComents(newComent);
          
              res.status(200).send({
                  msg: "Comentario Creado Exitosamente"
              });
          }else{
            res.status(400).send({
              msg:"Comentario no encontrado"
            })
          }
      
        
      
    } catch (err) {
      res.status(500).send({ msg: "Erorr en el servidor: ", err: err.message });
    }
  };

  
  const getComentsByProfeId=async (req,res)=>{
   
    try {
      const {id}=req.params;

      const buscarComents= await Coments.findAll({
          include: {
              model: Alumno,
              // attributes: ["usuario","foto_principal","id"],
          },
          where: {
            profesorId: id,
          },
        })
      
      
      if (buscarComents) {
        function SortArray(y, x){
            if (x.id < y.id) {return -1;}
            if (x.id > y.id) {return 1;}
            return 0;
        }
        buscarComents=buscarComents.sort(SortArray)}
        
        if (buscarComents.length>0){
            res.status(200).json(buscarComents);
        }
        if (buscarComents.length===0){
            res.status(400).json({msg:'Sin comentarios que mostrar '});
        }

        
        
    } catch (error) {
        res.status(400).json(error)
    }
  }
  
  const eliminarComent = async (req, res) => {
    try {
        let { id } = req.params;
      let buscarid = await Coments.findByPk(id);
      if (buscarid) {
        await Coments.destroy({
          where: {
            id: id,
          },
        });
        res.status(200).json({ msg: "Se elimino el Comentario correctamente." });
      } else {
        res.status(400).json({ msg: "no se encontro ningun comentario cone se id" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const editComent = async (req, res) => {
    try {
        let { id } = req.params;
      const { contenido , likes} = req.body;
      const findComent = await Coments.findByPk(id);
  
      if (findComent) {

          let fields={}
          if(contenido) fields.contenido=contenido;
          if(likes) fields.likes=likes;

        
        if (Object.entries(fields).length > 0){
          await findComent.update(fields );
          res.status(200).json({msg:"Se actualizo el comentario correctamente."})
      }
       
      } else {
        res.status(400).json(
         {msg:"No se encontro el comentario"}
        );
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("hubo un error");
    }
  };

  module.exports = {createComent,createComentonComentProfe,editComent,eliminarComent,getComentsByProfeId,  createComentonComent};