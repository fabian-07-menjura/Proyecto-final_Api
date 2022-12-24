const { Router } = require('express');
const {getApiCountries} = require("../controllers/paises");

const router = Router();

router.get('/',getApiCountries)

module.exports = router;