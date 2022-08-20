const { Router } = require('express');
const { getId } = require('../ControllID');
const { getName } = require('../ControllName');
const { recipePost } = require('../ControllPost');
const { getTypes } = require('../ControllTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes",getName)
router.get("/types",getTypes)
router.get("/recipes/:id",getId)
router.post("/recipes",recipePost)



module.exports = router;
