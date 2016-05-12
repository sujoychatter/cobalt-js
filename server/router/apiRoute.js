var express = require('express'),
	router = express.Router();

var apiDemoController = require('../controllers/apiDemoController');

router.get('/demoPosts', apiDemoController.init);

module.exports = router;