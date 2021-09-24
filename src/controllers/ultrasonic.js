require("dotenv").config();

/**
 * @global
 * @typedef {Object} Distance
 * @property {String} time - time at which the value was measured
 * @property {Number} value - distance between sensor and closest object in Centimeters
 */

const MICROSECONDS_PER_CM = 1e6 / 34321;

let gpio, trigger, echo, db;

db = require("../db");
if (!process.env.SIMULATION) {
    gpio = require("pigpio").Gpio;
    trigger = new gpio(process.env.GPIO_TRIGGER, { mode: gpio.OUTPUT });
    echo = new gpio(process.env.GPIO_ECHO, { mode: gpio.INPUT, alert: true });

    trigger.digitalWrite(0);
}

let startTick;
if (!process.env.SIMULATION) {
    echo.on("alert", (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            db.insertDistanceMeasurements({
                time: new Date().getTime(),
                distance: diff / 2 / MICROSECONDS_PER_CM,
            });
        }
    });
}

// Trigger a distance measurement once per env.UPDATE_RATE
setInterval(
    process.env.SIMULATION
        ? () => {
              var rndDistance = Math.floor(Math.random() * 20) + 80;
              db.insertDistanceMeasurements({
                  time: new Date().getTime(),
                  distance: rndDistance,
              });
          }
        : () => {
              trigger.trigger(10, 1); // Set trigger high for 10 microseconds
          },
    process.env.UPDATE_RATE
);

getDistanceMeasurements = (req, res) => {
    var limit = (req.query.latest != undefined) ? 1 : 0;
    return res.json(db.getDistanceMeasurements(limit));
};

module.exports = {
    getDistanceMeasurements,
};
