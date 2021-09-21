require("dotenv").config();

/**
 * @global
 * @typedef {Object} LEDState
 * @property {Boolean} state - 0 if LED is off, else 1
 */

let db, gpio, led, ledState;

db = require("../db");
if (!process.env.SIMULATION) {
    gpio = require("pigpio").Gpio;
    led = new gpio(process.env.GPIO_LED, { mode: gpio.OUTPUT });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {LEDState} - JSON with LED State
 */
const getStateLED = (req, res) => {
    if (!process.env.SIMULATION) {
        ledState = led.digitalRead();
    }
    return res.json({ state: ledState });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const setStateLED = (req, res) => {
    ledState = Number(req.params.state);

    if (ledState !== 0 && ledState !== 1) {
        return res.sendStatus(400);
    }

    if (!process.env.SIMULATION) {
        led.digitalWrite(ledState);
    } else {
        console.log("LED has changed to " + ledState);
    }

    db.changeLEDStatus({
        time: new Date().getTime(),
        status: ledState,
    });

    return res.sendStatus(200);
};

module.exports = {
    getStateLED,
    setStateLED,
};
