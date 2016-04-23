var express = require('express'),
	router = express.Router();

var homeController = require('../controllers/homeController');

router.get('/', homeController.init);

module.exports = router;