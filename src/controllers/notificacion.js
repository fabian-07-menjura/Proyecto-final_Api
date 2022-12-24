const { Profesor, Alumno , Notificaciones,Coments } = require("../db");

const getAllNotificaciones=async (req, res)=>{
    const notificacionesFinal=[]
    try {
          let buscarNotificaciones= await Notificaciones.findAll()
        
        if (buscarNotificaciones.length>0 ){
            function SortArray(y, x){
              if (x.id < y.id) {return -1;}
              if (x.id > y.id) {return 1;}
              return 0;
          }
            buscarNotificaciones=buscarNotificaciones.sort(SortArray)   
            for (let i = 0; i < buscarNotificaciones.length; i++) {
                let denuncianteinfo;
                let denunciadoinfo;
                let comentInfo= await Coments.findByPk(buscarNotificaciones[i].comentarioId)
                  if(!comentInfo){
                    comentInfo={mensaje:'Comentario no disponible'}
                  }
                 denuncianteinfo=await Profesor.findByPk(buscarNotificaciones[i].denuncianteId,{
                    attributes: ["id","tipo","nombre","apellido","username","imagen"]})
                if(!denuncianteinfo){
                  denuncianteinfo= await Alumno.findByPk(buscarNotificaciones[i].denuncianteId,{
                    attributes: ["id","tipo","name","lastname","username","picture"]
                  })      
                }
                denunciadoinfo=await Profesor.findByPk(buscarNotificaciones[i].denunciadoId ,{
                    attributes: ["id","tipo","nombre","apellido","username","imagen"]})
                if(!denunciadoinfo){
                  denunciadoinfo=await Alumno.findByPk(buscarNotificaciones[i].denunciadoId ,{
                    attributes: ["id","tipo","name","lastname","username","picture"]
                  })      
                }
                notificacionesFinal.push({...buscarNotificaciones[i].dataValues,comentInfo,denuncianteinfo,denunciadoinfo})
                
            }
            
                      
            res.status(200).json(notificacionesFinal);
        }
        if (buscarNotificaciones.length===0){
            res.status(200).json({msg:'Sin Notificaciones que mostrar .'});
        }
       
    } catch (error) {
        res.status(400).json(error)
    }
  }
  
  const getNotificacionById=async(req,res)=>{
    try {
      const {id}=req.params
      const findNotificacion=await Notificaciones.findByPk(id)
      if(findNotificacion){     
          res.status(200).json(findNotificacion);
      }
     
      else{
        res.status(400).json({error:"No existe una notificacion con ese id."})
      }
   
} catch (error) {
    res.status(400).json(error)
}
  }
  
    const createNotificacion = async (req, res) => {
      try {
         console.log(req.body) 
        const { razon, denuncianteId, denunciadoId,comentarioId } = req.body;
        console.log(parseInt(comentarioId,10))
        if(!razon)  throw new Error(" Razon no puede ser nulo");

        if (!denuncianteId) throw new Error(" Denunciante no puede ser nulo");
        const findAlumno = await Alumno.findByPk(denuncianteId);
        const findProfe=await Profesor.findByPk(denuncianteId)
        if (!findAlumno && !findProfe) throw new Error("Ese usuario no existe");
        
        if (!denunciadoId) throw new Error(" Denunciado no puede ser nulo");
        const findAlumnoDe = await Alumno.findByPk(denunciadoId);
        const findProfeDe=await Profesor.findByPk(denunciadoId)
        if (!findAlumnoDe && !findProfeDe) throw new Error("Ese usuario no existe");
        
        if(!comentarioId)throw new Error("Comentario no puede ser nulo");        
        const findComentario=await Coments.findByPk(parseInt(comentarioId,10))
        if (!findComentario) throw new Error("Ese comentario no existe");
        
        await Notificaciones.create({
            razon, denuncianteId, denunciadoId,comentarioId
        });   
        
        res.status(200).send({
          msg: "Notificacion Creada Exitosamente"
        });
      } catch (err) {
        res.status(400).send({ err: err.message });
      }
    };
  
    const eliminarNotificacion = async (req, res) => {     
      
      try {
        const { id } = req.params; 
       
          await Notificaciones.destroy({
            where: {           
              id:id
            },
          });
          res.status(200).json({ msg: "Se elimino la Notificaciones" });
        
      } catch (error) {
        res.status(400).json({error: error})
      }
    };
  
    const editarNotificacion = async (req, res) => {
      try {
          let { id } = req.params;
          
        const findReaccion = await Notificaciones.findByPk(id);
    
        if (findReaccion) {
           await Notificaciones.update(
            {
              visto2:true
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
            error: 'Notificaciones no encontrada'
          })
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({error:error});
      }
    };

    const editarNotificaciones = async (req, res) => {
        try {
           
             await Notificaciones.update(
              {
                visto1:true
              },
              {
                where: {
                  visto1: false,
                },
              }
            );
            res.status(200).json({
                msg: "Cambios guardados"
              });
        
        } catch (error) {
          console.log(error);
          res.status(400).json({error:error});
        }
      };
  
    
  module.exports = {getAllNotificaciones,
                    getNotificacionById,
                    createNotificacion,
                    eliminarNotificacion,
                    editarNotificacion,
                    editarNotificaciones}