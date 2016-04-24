module.exports = {
	init: function(req, res, next){
		res.render('home', { title: 'Hey', message: 'Hello there!'});
	}
}