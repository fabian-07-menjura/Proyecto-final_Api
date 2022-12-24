const { Router } = require("express");
const{getSimilitudes}=require('../controllers/search')
const router = Router();
router.get("/", getSimilitudes);

module.exports = router;