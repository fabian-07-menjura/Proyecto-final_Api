const { Router } = require("express");



const {getProfesor,getUsuariosPorPais,getById,postProfe,deleteProfesor,putProfesor,getProfesorsMaterias,fetchProfesor} = require("../controllers/profesores");


const router = Router();


router.get("/",getProfesor);

router.get("/api",fetchProfesor);

router.get("/materias",getProfesorsMaterias)
router.get("/paises",getUsuariosPorPais)

router.get("/:id",getById);
router.post("/",postProfe);
router.delete("/:id",deleteProfesor);
router.patch("/:id",putProfesor);

module.exports = router;