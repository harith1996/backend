require("dotenv").config();

/**
 * @global
 * @typedef {Object} Humidity
 * @property {String} time - time at which the value was measured
 * @property {Number} humidity - value in percentage
 */
/**
 * @global
 * @typedef {Object} Temperature
 * @property {String} time - time at which the value was measured
 * @property {Number} temperature - value in degrees Celsius
 */

let dht, db, dataPin, dhtType, sensor;

db = require("../db");
if (!process.env.SIMULATION) {                      //connect to sensors on RPI (if not in SIMULATION mode)
    dht = require("pigpio-dht");
    dataPin = process.env.GPIO_DHT11;
    dhtType = 11;
    sensor = dht(dataPin, dhtType);
}

// Trigger temperature and humidity measurements once per env.UPDATE_RATE
setInterval((process.env.SIMULATION) ? () => {
              var time, rndTemperature, rndHumidity;
              time = new Date().getTime();
              rndTemperature = Math.floor(Math.random() * 10) + 20;  //round off temperature & humidity readings 
              rndHumidity = Math.floor(Math.random() * 10);

              db.insertHumidityMeasurements({
                  time: time,
                  humidity: rndHumidity,
              });

              db.insertTemperatureMeasurements({
                  time: time,
                  temperature: rndTemperature,
              });
          }
        : () => {
              sensor.read();
          },
    process.env.UPDATE_RATE
);

if (!process.env.SIMULATION) {
    sensor.on("result", (data) => {                 //every sensor reading triggers a DB insert. 
        var time = new Date().getTime();
        db.insertHumidityMeasurements({
            time: time,
            humidity: data.humidity,
        });

        db.insertTemperatureMeasurements({
            time: time,
            temperature: data.temperature,
        });
    });
}

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
