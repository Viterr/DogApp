const router = require('express').Router();
const {getAllTemperaments}  = require('../controllers/Temperament.controller')

router.get('/', getAllTemperaments)

module.exports = router;