const http = require('http')
const httpProxy = require('http-proxy')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const db = require('./db')
const app = express()
const mqttProxy = httpProxy.createProxyServer({
    target: `ws://${process.env.MQTT_BROKER}:${process.env.MQTT_WS_PORT}`,
    ws: true
})
const server = http.createServer(app)
const mqttconn = require('./mqtt');

mqttconn.init(
    process.env.MQTT_BROKER,
    process.env.MQTT_PORT
)

/*  
    WebSocket server is sent to DB handler, 
    in order to send broadcasts as and when DB changes occur
*/
db.init(mqttconn);
app.use(cors())
app.use(express.json({ limit: process.env.MAX_PAYLOAD || '1mb' }));

routes(app);

server.on('upgrade', (req, socket, head) => {
    console.log("⚡️ Putting that proxy to good use! A new client is using it :D")
    mqttProxy.ws(req, socket, head)
})

/** Start application at the specified port */
server.listen(process.env.PORT || 8080, () => {
    console.log(`✔️ Backend running at port ${process.env.PORT || 8080}`)
})
