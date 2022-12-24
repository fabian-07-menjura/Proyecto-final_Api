const { Router } = require("express");
const {
    createComent,
    createComentonComentProfe
    ,editComent,
    eliminarComent,
    createComentonComent,
    getComentsByProfeId}=require('../controllers/Comentarios')

const router = Router();


router.get('/:id',getComentsByProfeId)
router.post("/", createComent);
router.post("/coment/", createComentonComent);
router.post("/coment/profesor", createComentonComentProfe)
router.delete("/:id", eliminarComent);
router.patch("/:id", editComent);
module.exports = router;