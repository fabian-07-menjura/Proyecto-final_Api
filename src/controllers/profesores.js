const { Profesor, Materias, Country,Puntuacion,Certificado,Coments, Alumno, Fechas  } = require("../db.js");

const { Op } = require("sequelize");

const getUsuariosPorPais=async(req,res)=>{
  try {
    let data=[
      {          
          name: "El Salvador",
          "numero de usuarios por pais":0          
      },
      {          
          name: "Uruguay",
          "numero de usuarios por pais":0     
      },
      {          
          name: "Argentina",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Bolivia",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Colombia",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Nicaragua",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Chile",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Ecuador",
          "numero de usuarios por pais":0  
      },
      {
          name: "Paraguay",
          "numero de usuarios por pais":0            
      },
      {        
          name: "Puerto Rico",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Costa Rica",
          "numero de usuarios por pais":0  
      },
      {         
          name: "Cuba",
          "numero de usuarios por pais":0  
      },
      {          
          name: "Guatemala",
          "numero de usuarios por pais":0  
      },
      {         
          name: "Honduras",
          "numero de usuarios por pais":0  
      },
      {        
          name: "Venezuela",
          "numero de usuarios por pais":0  
      }
  ]
    
    let profesores=await Profesor.findAll({
      include:[
        {model:Country}
      ]
    })
    let alumnos =await Alumno.findAll({
      include:[
        {model:Country}
      ]
    })
    if(profesores.length>0){
    profesores.map((p)=>{      
        data.map((d)=>{
          if(d.name===p.country.name){
              d['numero de usuarios por pais']=(d['numero de usuarios por pais']+1)
           
          }
        })         
    })          
  }
  if(alumnos.length>0){
    alumnos.map((p)=>{      
        data.map((d)=>{
          if(d.name===p.country.name){
              d['numero de usuarios por pais']=(d['numero de usuarios por pais']+1)
           
          }
        })
         
    })    
      
  }
  function SortArray(y, x){
    if (x['numero de usuarios por pais']  < y['numero de usuarios por pais'] ) {return -1;}
    if (x['numero de usuarios por pais']  > y['numero de usuarios por pais'] ) {return 1;}
    return 0;
}
  data=data.sort(SortArray)
  res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ msg: error });
  }


}

const getProfesorsMaterias=async(req,res)=>{
  try {
    let data=[
      {name:'algebra',value:0},
      {name:'aritmética',value:0},
      {name:'geometría',value:0} ,
      {name:'trigonometría',value:0}, 
      {name:'biología',value:0},
      {name:'quimica',value:0}, 
      {name:'fisica',value:0},
      {name:'geografía',value:0},
      {name:'economía',value:0},
      {name:'historia',value:0},
      {name:'arte',value:0},
      {name:'música',value:0},
      {name:'literatura',value:0},
      {name:'lenguaje',value:0},
      {name:'filosofía',value:0},
      {name:'psicología',value:0},
      {name:'ingles',value:0},
      {name:'computación',value:0}
    ] 
    
    let profesores=await Profesor.findAll({
      include:[
        {model:Materias}
      ]
    })
    
    if(profesores.length>0){
    profesores.map((p)=>{
      p.materias.map((pm)=>{
        data.map((d)=>{
          if(d.name===pm.name){
              d.value=(d.value+1)
           
          }
        })
      })   
    })    
      function SortArray(y, x){
        if (x.value  < y.value ) {return -1;}
        if (x.value  > y.value ) {return 1;}
        return 0;
    }
      data=data.sort(SortArray)
  }
  res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ msg: error });
  }

}
const getProfesor = async (req, res) => {
  let { nombre } = req.query;

  let info = await Profesor.findAll({
    include: [
      {
        model: Materias, // va a buscar en el modelo mterias
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      { model: Country },
      { model:Puntuacion,
        attributes:["puntaje"]
      },
      {
        model: Fechas,
        attributes: ["fecha", "hora"],
        through: {
          attributes: []
        }
      }
     
    ],
    where:{
      administrador:false
    }
  });

  try {
    if (nombre) {
      let nameProfe = await info.filter((e) =>
        e.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      console.log(nameProfe);

      nameProfe.length
        ? res.status(200).json(nameProfe)
        : res.status(404).json({ msg: "no se encontro profesor" });
    } else {
      res.status(200).json(info);
    }
  } catch (e) {
    res.status(404).json({ msg: "no se encontro bro " });
  }
};

const getById = async (req, res) => {
  let { id } = req.params;

  let infoId = await Profesor.findByPk(id, {
    include: [
      {
        model: Materias, // va a buscar en el modelo mterias
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      { model: Country },
      { model:Puntuacion,
        include:[
          {model:Alumno,
            attributes:["id","name","lastname","picture"]}
        ]},
      { model:Certificado },
      {model:Coments,
        attributes:["id","contenido","likes"],
      include:[
        {model:Alumno,
          attributes:["id","name","lastname","picture"],
          include:[
            {model:Country}
          ]
        
        },
        {model:Coments,
          attributes:["id","contenido","likes"],
          include:[
            {model:Alumno,
              attributes:["id","name","lastname","picture"],
              include:[
                {model:Country}
              ]
            },
              
            {model:Profesor,
              attributes:["id","nombre","apellido","username","imagen"],
              include:[
                {model:Country}
              ]
              }
          ]},
      ]},
      {
        model: Fechas,
        attributes: ["fecha", "hora"],
        through: {
          attributes: []
        },
        include: [
          {
            model: Alumno,
            attributes: ["name", "lastname"],
            through: {
              attributes: []
            }
          }
        ]
      }
    ],
  });

 if(infoId){
  function SortArray(y, x){
    if (x.id < y.id) {return -1;}
    if (x.id > y.id) {return 1;}
    return 0;
}
  infoId.coments=infoId.coments.sort(SortArray)



 }

  // console.log(infonew);
  try {
    if (!infoId) {
      res.status(404).json({ msg: " no se encontro el profesor" });
    }else{

      res.status(200).json(infoId);
    }

  } catch (e) {
    console.log(e);
  }
};

const postProfe = async (req, res) => {
  const {
    id,

    tipo,

    nombre,
    apellido,
    username,
    imagen,
    email,
    pais,
    puntuacion,
    descripcion,
    precio,
    estudios,
    materias,
  } = req.body;

  console.log(req.body);
  try {
    let findPais = await Country.findOne({
      where: { name: pais },
    });

    if (findPais) {
      let NewProfesor = await Profesor.create({
        id,

        tipo: "profesor",
        nombre,
        apellido,
        username,
        imagen,
        email,
        countryId: findPais.id,
        puntuacion,
        descripcion,
        precio,
        estudios,
      });

      await NewProfesor.setMaterias(await materias);
    }

    res.status(200).send("perfil Creado Correctamente");
  } catch (e) {
    console.log(e);
  }
};


const fetchProfesor = async (req, res) => {
  let { count, page, subject, sortBy, orderBy,pais } = req.query;
  if(!count || !page )
  return res.status(400).send({error:'missing query parameters'});

  const limitt = parseInt(count);
  const pageInt = parseInt(page);
  const offsett = limitt * pageInt; 
  let val = 'ASC';
  let orderCondition = 'username';

  if (isNaN(limitt) || isNaN(pageInt))
  return res.status(400).send({error:'invalid value for query parameters'});

  if (limitt<=0 || pageInt<0)
  return res.status(400).send({error:'query parameters cannot contain negative value'});

   if (sortBy){
    orderCondition = sortBy

  }else{
    orderCondition = 'username'

  };

  if (orderBy){
    val = orderBy

  }else{
    orderBy = 'DESC'

  };

  let info = await Profesor.findAndCountAll({
    limit:limitt,
    offset:offsett,
    include: [
      {
        model: Materias, // va a buscar en el modelo mterias
        attributes: ["name"],
        where: {name : subject}
      },
      { model: Country,
        where:{[Op.and]: [
          pais && { name: pais },
        ],
      }
       },
      { model:Puntuacion,
        attributes:["puntaje"]
      },
     
    ],
    order: [[orderCondition,val]], 
  });
  var obj = {
    cantidad:  info.count,
    profes: info.rows
    
  };
  res.send (obj);

  
};

//

// para borrar del todo !
const deleteProfesor = async (req, res) => {
  const { id } = req.params;
  try {
    await Profesor.destroy({ where: { id: id } });

    res.status(200).json({ msg: "Usuario borrado correctamente!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//put
const putProfesor = async (req, res) => {  


  try {
    const { id } = req.params;    
    
  const {
    nombre,
    apellido,
    imagen,
    country,
    descripcion,
    descripcion2,
    precio,
    materias,
    administrador,
    baneado,
    fechaLimiteBan,
    razon
  } = req.body;

    const findProfesor = await Profesor.findByPk(id);

    var fields = {};
   
    if (nombre) fields.nombre = nombre;
    if (apellido) fields.apellido = apellido;
    if (descripcion) fields.descripcion = descripcion;
    if (descripcion2) fields.descripcion2 = descripcion2;
    if(administrador) fields.administrador=administrador;
    if (imagen) fields.imagen = imagen;
    if (precio) fields.precio = precio;
    if(baneado===true || baneado===false) fields.baneado=baneado;
    if(fechaLimiteBan) fields.fechaLimiteBan=fechaLimiteBan;
    if(razon) fields.razon=razon;
    if (materias) fields.materias = materias;
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

    if (findProfesor) {
      await findProfesor.update(fields);

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

//patch

module.exports = {
  getProfesor,
  getById,
  postProfe,
  deleteProfesor,
  putProfesor,

  fetchProfesor,

  getProfesorsMaterias,
  getUsuariosPorPais

};
