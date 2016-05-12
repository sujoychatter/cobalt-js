var homeRoute = require('./homeRoute')
var apiRoute = require('./apiRoute')

module.exports = {
	init: function(app){
		app.use('/api', apiRoute);
		app.use('/', homeRoute);
	}
};
