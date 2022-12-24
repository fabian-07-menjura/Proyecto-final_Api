const {Fechas, Profesor, Alumno} =require("../db")

const getFechas = async(req, res)=>{
    const fechas = await Fechas.findAll({
        include:[
            {
                model:Profesor,
                attributes:["nombre"],
                through:{attributes:[]}
            },
            {
                model:Alumno,
                attributes:["name"],
                through:{attributes:[]}
            }
        ]
    })
    try {
        res.status(200).json(fechas)
    } catch (error) {
        res.status(404).send("error")
    }
}

const postFechas = async (req, res)=>{
    const{
        fecha,
        hora,
        habilitado,
        idProfesor,
        idAlumno
    }= req.body
    console.log(req.body)
    try {
        let newFecha= await Fechas.create({
            fecha,
            hora,
            habilitado
        })
        let profe = await Profesor.findByPk(idProfesor)
        let alumno = await Alumno.findByPk(idAlumno)
        newFecha.addProfesor(profe)
        newFecha.addAlumno(alumno)
        res.status(200).send("Fecha guardada")
    } catch (error) {
        res.status(404).send(console.log(error))
    }
}

module.exports = {postFechas, getFechas}