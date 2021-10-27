const db = require('../db')
const mqttconn = require('../mqtt')

/**
 * @param {Request} req
 * @param {Response} res
 * @returns {LEDState} - JSON with LED State
 */
const getStateLED = (req, res) => {
    index = Number(req.params.index);
    return res.json(db.getStateLED(index, 1));
};

/**
 * Sets state of a LED given in req.params.index
 * @param {Request} req - should have parameters 'index' for LED no. 
 *                        and 'state' for LED state
 * @param {Response} res
 */
const setStateLED = (req, res) => {
    index = Number(req.params.index);
    state = Number(req.params.state);

    if (state !== 0 && state !== 1) {
        return res.sendStatus(400);
    }

    mqttconn.sendJSON2Broker("trigger-led", {
        time: new Date().getTime(),
        id: index,
        state: state,
    })

    return res.sendStatus(200);
};

module.exports = {
    getStateLED,
    setStateLED,
};
