const { Router } = require("express");
const {
    getAllNotificaciones,
    getNotificacionById,
    createNotificacion,
    eliminarNotificacion,
    editarNotificacion,
    editarNotificaciones}=require('../controllers/notificacion')

const router = Router();


router.get('/',getAllNotificaciones)
router.post("/", createNotificacion);
router.patch("/",editarNotificaciones)
router.get("/:id",getNotificacionById)
router.delete("/:id", eliminarNotificacion);
router.patch("/:id", editarNotificacion);
module.exports = router;