const { Router } = require("express");
const {
    createCertificado,
    editCertificado,
    eliminarCertificado
    ,getCertiByProfeID}=require('../controllers/certificados')

const router = Router();


router.get('/:id',getCertiByProfeID)
router.post("/", createCertificado);
router.delete("/:id", eliminarCertificado);
router.patch("/:id", editCertificado);
module.exports = router;