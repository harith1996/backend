const Database = require("better-sqlite3");
const db = new Database("data.db");

let mqttconn

/**
 * Initializes the database : creates Tables for each measurement
 * @param {WebSocket.Server} wss - used for sending broadcasts upon DB change
 */
const init = (mqtt) => {
    
    mqttconn = mqtt

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
        time INTEGER NOT NULL,\
        id INTEGER NOT NULL,\
        state REAL NOT NULL,\
        PRIMARY KEY (time, id)\
    )"
    ).run();
    
    mqttconn.subscribe(['humidity', 'temperature', 'distance'],
        [insertHumidityMeasurements, insertTemperatureMeasurements, insertDistanceMeasurements])
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
    data = JSON.parse(data.toString())
    console.log(`☔︎ '#humidity' has received a new value (${data.humidity})`)
    db.prepare("INSERT INTO humidity VALUES (@time, @humidity)").run(data);
};

/**
 * Inserts a new temperature reading into DB and broadcasts the reading to all WebSocket clients
 * @param {*} data
 */
const insertTemperatureMeasurements = (data) => {
    data = JSON.parse(data.toString())
    console.log(`☕︎ '#temperature' has received a new value (${data.temperature})`)
    db.prepare("INSERT INTO temperature VALUES (@time, @temperature)").run(
        data
    );
};

/**
 * Inserts a new distance reading into DB and broadcasts the reading to all WebSocket clients
 * @param {*} data
 */
const insertDistanceMeasurements = (data) => {
    data = JSON.parse(data.toString())
    console.log(`﹆ '#distance' has received a new value (${data.distance})`)
    db.prepare("INSERT INTO distance VALUES (@time, @distance)").run(data);
};

const getStateLED = (index, limit = 0, orderasc = false) => {
    var query_str = 'SELECT * FROM led WHERE id = @id'
    query_str += ` ORDER BY time ${orderasc ? 'asc' : 'desc'}`
    query_str += (limit > 0) ? ` LIMIT ${limit}` : ''
    return db.prepare(query_str).all({'id': index});
}

/**
 * Changes LED status, inserts the new LED status change into DB and broadcasts the current LED Status to all WebSocket clients
 * @param {*} data
 */
const changeLEDStatus = (data) => {
    db.prepare("INSERT INTO led VALUES (@time, @id, @state)").run(data);
    mqttconn.sendJSON2Broker("led", data)
};

module.exports = {
    init,
    getHumidityMeasurements,
    insertHumidityMeasurements,
    getTemperatureMeasurements,
    insertTemperatureMeasurements,
    getDistanceMeasurements,
    insertDistanceMeasurements,
    getStateLED,
    changeLEDStatus,
};
