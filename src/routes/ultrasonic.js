const express = require('express')
const controller = require('../controllers/ultrasonic')
const router = express.Router()

/** GET /api/distance to get all of the recorded data from the ultrasonic sensor */
router.get('/distance', controller.getDistanceMeasurements);

module.exports = router;