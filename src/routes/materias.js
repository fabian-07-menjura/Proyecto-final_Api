const { Router } = require("express");
const { createMaterias, getAllMaterias, deleteMaterias, editMaterias } = require("../controllers/materias");

const router = Router();

router.get("/", getAllMaterias)
router.post("/", createMaterias);
router.delete("/:id", deleteMaterias);
router.patch("/:id", editMaterias);

module.exports = router;