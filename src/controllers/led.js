const db = require('../db')

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
 *
 * @param {Request} req
 * @param {Response} res
 */
const setStateLED = (req, res) => {
    index = Number(req.params.index);
    state = Number(req.params.state);

    if (state !== 0 && state !== 1) {
        return res.sendStatus(400);
    }

    console.log(`ℹ︎  Saving and publishing LED (${index}) state (${state})!`);

    db.changeLEDStatus({
        time: new Date().getTime(),
        id: index,
        state: state,
    });

    return res.sendStatus(200);
};

module.exports = {
    getStateLED,
    setStateLED,
};
