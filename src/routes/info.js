const express = require('express')
const controller = require('../controllers/info')
const router = express.Router()

/** GET /api/info to retrieve info from the server.
 * Right now we only return the update rate for the sensors.
 */
router.get('/info', controller.getInfo);

module.exports = router;
