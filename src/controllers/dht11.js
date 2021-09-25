const db = require("../db");

/**
 * @param {Request} req - HTTP requests
 * @param {Response} res - HTTP response
 * @returns {Humidity} - a JSON with Humidity measurements
 */
const getHumidityMeasurements = (req, res) => {
    limit = (req.query.latest != undefined) ? 1 : 0;
    return res.json(db.getHumidityMeasurements(limit));
};

/**
 * @param {Request} req - HTTP requests
 * @param {Response} res - HTTP response
 * @returns {Temperature} - a JSON with Temperature measurements
 */
const getTemperatureMeasurements = (req, res) => {
    limit = (req.query.latest != undefined) ? 1 : 0;
    return res.json(db.getTemperatureMeasurements(limit));
};

module.exports = {
    getHumidityMeasurements,
    getTemperatureMeasurements,
};
