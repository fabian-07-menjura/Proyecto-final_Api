const { Profesor, Certificado  } = require("../db");

const createCertificado = async (req, res) => {
    try {
        
      const { nombre,foto, profesorId } = req.body;
      if (!nombre) throw new Error(" Nombre no puede ser nulo");
      if (!foto) throw new Error(" Foto no puede ser nulo");        
      if (!profesorId) throw new Error(" ProfesorId no puede ser nulo");
      const findProfe = await Profesor.findByPk(profesorId);
      if (!findProfe) throw new Error("No se encuentra al profesor");

     await Certificado.create({
        foto, profesorId, nombre
      });  
  
      res.status(200).send({
        msg: "Certificado Creado Exitosamente",
      
      });
    } catch (err) {
      res.status(500).send({  err: err.message });
    }
  };


 

  const getCertiByProfeID=async (req,res)=>{
   
    try {
        const {id}=req.params;
        const buscarProfe=await Profesor.findByPk(id)

        if(buscarProfe){
            const AllCertificados=await Certificado.findAll({
                where:{
                    profesorId:id
                }
            })
            if(AllCertificados.length>0){
                res.status(200).json(AllCertificados)

            }
            else{
                res.status(400).json({error:"Aun no hay certificados que mostrar"})
            }
        }

        else{
            res.status(400).json({error :"Profesor no encontrado"})
        }

        
        
    } catch (error) {
        res.status(400).json(error)
    }
  }
  
  const eliminarCertificado = async (req, res) => {
    try {
        let { id } = req.params;
      let buscarid = await Certificado.findByPk(id);
      if (buscarid) {
        await Certificado.destroy({
          where: {
            id: id,
          },
        });
        res.status(200).json({ msg: "Se elimino el Certificado." });
      } else {
        res.status(400).json({ msg: "No se encontro coincidencias." });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const editCertificado = async (req, res) => {
    try {
        let { id } = req.params;
      const { nombre, foto} = req.body;
      const findCertificado = await Certificado.findByPk(id);
        

      if (findCertificado) {

        let fields = {};

        if(nombre) fields.nombre=nombre;
        if(foto) fields.foto=foto;

        if (Object.entries(fields).length > 0){
            await findCertificado.update(fields)
            res.status(200).json({msg:"Se actualizo el certificado correctamente."})
        }


      } else {
        res.status(400).json({error:"Certificado no encontrado"})
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("hubo un error");
    }
  };

  module.exports = {createCertificado,editCertificado,eliminarCertificado,getCertiByProfeID};