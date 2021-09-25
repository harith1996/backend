const db = require("../db");

getDistanceMeasurements = (req, res) => {
    var limit = (req.query.latest != undefined) ? 1 : 0;
    return res.json(db.getDistanceMeasurements(limit));
};

module.exports = {
    getDistanceMeasurements,
};
