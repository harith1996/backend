const express = require('express')
const controller = require('../controllers/led')
const router = express.Router()

/** GET /api/led to get the LED's state */
router.get('/led', controller.getStateLED);

/** PUT /api/led/{0,1} to change the LED's state */
router.put('/led/:state', controller.setStateLED);

module.exports = router;