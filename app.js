var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.set('views', './server/views');

app.use(express.static('public'));

var router = require('./server/router');
router.init(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});