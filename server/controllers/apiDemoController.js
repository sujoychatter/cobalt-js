module.exports = {
	init: function(req, res, next){
		res.send({posts: [1,2,3,4]})
	}
}