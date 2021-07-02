const router = require('express').Router();
const {getAllBreeds,getBreedById} = require('../controllers/Dog.controller');
//const { Page, User } = require('../models');

router.get('/', getAllBreeds)
router.get('/:id', getBreedById)

module.exports = router;