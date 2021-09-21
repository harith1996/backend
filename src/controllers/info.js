require("dotenv").config();

/**
 * @global
 * @typedef {Object} PIInfo
 * @property {Number} update_rate - rate at which sensor data is polled from RPi
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {PIInfo} - a JSON containing update_rate of Rpi
 */
const getInfo = (req, res) => {
    return res.json({
        update_rate: process.env.UPDATE_RATE,
    });
};

module.exports = {
    getInfo,
};
