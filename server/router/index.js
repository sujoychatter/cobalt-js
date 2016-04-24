var homeRoute = require('./homeRoute')

module.exports = {
	init: function(app){
		app.use('/', homeRoute);
	}
};
