var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use('/app', express.static(__dirname + '/app'));

app.get('/', function (request, response) {
  res.render('404', { url: req.url });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
