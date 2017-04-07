const express = require('express'),
      bodyParser = require('body-parser'),
      expressNunjucks = require('express-nunjucks');
      path = require('path'),
      app = express(),  
      port = process.env.PORT || 8080,
      colours = require('./libs/colours');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/src/templates');

app.set('view engine', 'html');

const njk = expressNunjucks(app, {
    watch: app.get('env') === 'development',
    noCache: app.get('env') === 'development',
    globals: {title: 'Tweet Score'}
});

app.get('/', function(req, res) {
    res.render('views/index');
});


app.post('/api', function (req, res) {
    colours(req.body.url).then(function(colour){
        res.status(200).json({
            colour: colour
        });
    });
});


app.listen(port, function() {
    console.log('server listening on port ' + port);
});

