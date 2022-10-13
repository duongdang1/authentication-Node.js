const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const dataControllers = require('../controllers/dataController');
router.post('/push',auth,dataControllers.pushData);
router.post('/get',auth, dataControllers.getData);

module.exports = router;