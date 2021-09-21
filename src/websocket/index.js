const ws = require("ws");

/**
 *
 * @param {Server} server - an express server
 * @returns a WebSocket server running on the same path as 'server'
 */
const init = (server) => {
    return new ws.Server({ server });
};

/**
 * Takes in a JSON (msg), stringifies it, and broadcasts it to all clients of wss
 * @param {WebSocketServer} wss - Websocket server
 * @param {object} msg - JSON
 */
const broadcastJSON = (wss, msg) => {
    let str = JSON.stringify(msg);
    wss.clients.forEach((client) => {
        client.send(str);
    });
};

module.exports = {
    init,
    broadcastJSON,
};
