const { Router } = require('express');
const routes = require
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./dog.js');
const dogsRouter = require('./dogs.js');
const temperamentRouter = require('./temperament.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog', dogRouter);
router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;
