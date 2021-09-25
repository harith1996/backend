const mqtt = require('mqtt')

let mqttconn

/**
 *
 * @param {Server} server - an express server
 * @returns a WebSocket server running on the same path as 'server'
 */
const init = (host, port) => {
    mqttconn = mqtt.connect(host, {port: port});
};

/**
 * Takes in a JSON (msg), stringifies it, and broadcasts it to all clients of wss
 * @param {WebSocketServer} wss - Websocket server
 * @param {object} msg - JSON
 */
const sendJSON2Broker = (topic, msg) => {
    payload = JSON.stringify(msg)
    mqttconn.publish(topic, payload);
};

const subscribe = (topicarr, cbarr) => {
    mqttconn.subscribe(topicarr, undefined, (err, granted) => {
        if (err) {
            console.error("ⅹ Could not subscribe to topics :(");
            process.exit(1);
        } else {
            console.log("✔ Successfully connected to topics :D");
        }
    }) 
            
    mqttconn.on('message', (topic, payload) => {
        let index = topicarr.indexOf(topic);
        cbarr[index](payload)
    })
}

module.exports = {
    init,
    sendJSON2Broker,
    subscribe
};
