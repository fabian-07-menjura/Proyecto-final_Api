const { Router } = require("express");
const {
    getAllPuntuaciones,
    getAllPuntByProfeID,
    createPuntuacion,
    eliminarPuntuacion
    ,editarPuntuacion}=require('../controllers/Puntuacion')

const router = Router();


router.get('/',getAllPuntuaciones)
router.post("/", createPuntuacion);
router.get("/:id",getAllPuntByProfeID)
router.delete("/:id", eliminarPuntuacion);
router.patch("/:id", editarPuntuacion);
module.exports = router;