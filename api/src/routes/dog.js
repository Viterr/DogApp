const router = require('express').Router();
const {createBreed} = require('../controllers/Dog.controller')

router.post('/', createBreed)

module.exports = router;