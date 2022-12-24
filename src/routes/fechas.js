const {Router}= require("express")
const {postFechas, getFechas} = require("../controllers/fechas")

const router = Router()

router.get("/", getFechas)
router.post("/", postFechas)

module.exports =router