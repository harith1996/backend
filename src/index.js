const http = require('http')
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const db = require('./db')
const app = express()
const server = http.createServer(app)
const mqttconn = require('./mqtt');

if (process.env.SIMULATION) {
    console.log("ℹ︎  Backend running in simulation mode")
}

mqttconn.init(process.env.MQTT_BROKER, process.env.MQTT_PORT)

/*  
    WebSocket server is sent to DB handler, 
    in order to send broadcasts as and when DB changes occur
*/
db.init(mqttconn);
app.use(cors())
app.use(express.json({ limit: process.env.MAX_PAYLOAD || '1mb' }));

routes(app);

/** Start application at the specified port */
server.listen(process.env.PORT || 8080, () => {
    console.log(`✔️ Backend running at port ${process.env.PORT || 8080}`)
})
