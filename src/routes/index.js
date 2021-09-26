const express = require('express')
const ledRoute = require('./led')
const ultrasonicRoute = require('./ultrasonic')
const dht11Route = require('./dht11')

module.exports = (app) => {
	/** Set API routes */
	app.use('/api', ledRoute)
	app.use('/api', ultrasonicRoute)
	app.use('/api', dht11Route)

	/** Specify where the files for the frontend are  */
	app.use(express.static('frontend/build'))

	/**
	 * Allow for PathLocationStrategy
	 * https://angular.io/api/common/PathLocationStrategy
	 * */
	app.all('*', function (req, res) {
		res.status(200).sendFile(`/`, { root: `${__dirname}/../../frontend/build` });
	});
}
