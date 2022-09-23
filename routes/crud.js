const express = require('express');
const router = express.Router();

// Require controller modules. 
// create routes for requests for the CRUD operations
const crudControllers = require('../controllers/crudControllers')

router.get('/', crudControllers.index);
router.post('/', crudControllers.insert);
router.put('/update/:id', crudControllers.update);
router.delete('/delete/:id', crudControllers.delete);

module.exports = router; 


