var express = require('express');
var app = express();

var router = require('./router');
router.init(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});