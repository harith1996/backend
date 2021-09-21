const http = require('http')
const express = require('express')
const ws = require('ws')
const routes = require('./routes')
const cors = require('cors')
const db = require('./db')
const app = express()
const server = http.createServer(app)
const wsInterface = require('./websocket');
const wss = wsInterface.init(server);
const { WSASERVICE_NOT_FOUND } = require('constants')

if (process.env.SIMULATION) {
    console.log("!!! Backend running in simulation mode")
}

/*  
    WebSocket server is sent to DB handler, 
    in order to send broadcasts as and when DB changes occur
*/
db.init(wss);
app.use(cors())
app.use(express.json({ limit: process.env.MAX_PAYLOAD || '1mb' }));

routes(app);

/** Start application at the specified port */
server.listen(process.env.PORT || 8080, () => {
    console.log(`Backend running at port ${process.env.PORT || 8080}`)
})
