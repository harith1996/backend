const express = require('express')
const controller = require('../controllers/dht11')
const router = express.Router()

/** GET /api/temperature to get all of the recorded temperature data */
router.get('/temperature', controller.getTemperatureMeasurements);

/** GET /api/humidity to get all of the recorded humidity data */
router.get('/humidity', controller.getHumidityMeasurements);

module.exports = router;