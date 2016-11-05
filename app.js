var express = require('express');
var app = express();
var webpackDevHelper = require('./index.dev.js');

app.set('view engine', 'jade');

app.set('views', './server/views');

if (process.env.NODE_ENV !== 'production') {
  console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  app.use(express.static('public'));
}

var router = require('./server/router');
router.init(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});