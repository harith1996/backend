const Database = require("better-sqlite3");
const db = new Database("data.db");
const wsInterface = require("../websocket");

let websocket;

/**
 * Initializes the database : creates Tables for each measurement
 * @param {WebSocket.Server} wss - used for sending broadcasts upon DB change
 */
const init = (wss) => {
    websocket = wss;

    db.prepare(
        "CREATE TABLE IF NOT EXISTS distance (\
        time INTEGER PRIMARY KEY,\
        distance REAL NOT NULL\
    )"
    ).run();

    db.prepare(
        "CREATE TABLE IF NOT EXISTS temperature (\
        time INTEGER PRIMARY KEY,\
        temperature REAL NOT NULL\
    )"
    ).run();

    db.prepare(
        "CREATE TABLE IF NOT EXISTS humidity (\
        time INTEGER PRIMARY KEY,\
        humidity REAL NOT NULL\
    )"
    ).run();

    db.prepare(
        "CREATE TABLE IF NOT EXISTS led (\
        time INTEGER PRIMARY KEY,\
        status REAL NOT NULL\
    )"
    ).run();
};


//getters for each table

const getHumidityMeasurements = (limit = 0, orderasc = false) => {
    var query_str = 'SELECT * FROM humidity'
    query_str += ` ORDER BY time ${orderasc ? 'asc' : 'desc'}`
    query_str += (limit > 0) ? ` LIMIT ${limit}` : ''
    return db.prepare(query_str).all();
};

const getTemperatureMeasurements = (limit = 0, orderasc = false) => {
    var query_str = 'SELECT * FROM temperature'
    query_str += ` ORDER BY time ${orderasc ? 'asc' : 'desc'}`
    query_str += (limit > 0) ? ` LIMIT ${limit}` : ''
    return db.prepare(query_str).all();
};

const getDistanceMeasurements = (limit = 0, orderasc = false) => {
    var query_str = 'SELECT * FROM distance'
    query_str += ` ORDER BY time ${orderasc ? 'asc' : 'desc'}`
    query_str += (limit > 0) ? ` LIMIT ${limit}` : ''
    return db.prepare(query_str).all();
};

/**
 * Inserts a new humidity reading into DB and broadcasts the reading to all WebSocket clients
 * @param {Humidity} data - Object with "time" and "humidity"
 */
const insertHumidityMeasurements = (data) => {
    var msg = { type: "humidity", payload: data };
    db.prepare("INSERT INTO humidity VALUES (@time, @humidity)").run(data);
    wsInterface.broadcastJSON(websocket, msg);
};

/**
 * Inserts a new temperature reading into DB and broadcasts the reading to all WebSocket clients
 * @param {*} data
 */
const insertTemperatureMeasurements = (data) => {
    var msg = { type: "temperature", payload: data };
    db.prepare("INSERT INTO temperature VALUES (@time, @temperature)").run(
        data
    );
    wsInterface.broadcastJSON(websocket, msg);
};

/**
 * Inserts a new distance reading into DB and broadcasts the reading to all WebSocket clients
 * @param {*} data
 */
const insertDistanceMeasurements = (data) => {
    var msg = { type: "distance", payload: data };
    db.prepare("INSERT INTO distance VALUES (@time, @distance)").run(data);
    wsInterface.broadcastJSON(websocket, msg);
};

/**
 * Changes LED status, inserts the new LED status change into DB and broadcasts the current LED Status to all WebSocket clients
 * @param {*} data
 */
const changeLEDStatus = (data) => {
    var msg = { type: "led", payload: data };
    db.prepare("INSERT INTO led VALUES (@time, @status)").run(data);
    wsInterface.broadcastJSON(websocket, msg);
};

module.exports = {
    init,
    getHumidityMeasurements,
    insertHumidityMeasurements,
    getTemperatureMeasurements,
    insertTemperatureMeasurements,
    getDistanceMeasurements,
    insertDistanceMeasurements,
    changeLEDStatus,
};
