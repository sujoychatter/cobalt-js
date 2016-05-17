module.exports = {
	init: function(req, res, next){
		setTimeout(function(){
			res.send({posts: [1,2,3,4]})
		}, 1000);
	}
}