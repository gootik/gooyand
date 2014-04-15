/**
 * Gooyand application
 *
 * @author Sasan Hezarkhani
 */
var express = require('express')
  , connect = require('connect')
  , compress = require('compression')()
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , LinkProvider = require('./LinkProvider').LinkProvider
  , LINK_TYPES = require('./LinkProvider').LINK_TYPES;

/*****************
 * CONFIG
 ******************/
var CONFIG = {
  defaultPort: 3000,
  mongoPort: 27017,
  canSetup: true,
  isBeta: false
};

var app = express()
  , linkProvider = new LinkProvider('localhost', CONFIG.mongoPort)
  ;

// Don't show express
app.disable('x-powered-by');


app.set('port', process.env.PORT || CONFIG.defaultPort);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(compress);
app.use(favicon(__dirname + '/public/favicon.ico', {maxAge: 2592000000}));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('-->ThisIsMySecred<--'));
// app.use(express.session());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(app.router);

app.get('/', function(req, res) {
  linkProvider.findAllSortedByType(function(err, links) {
    if(err)
      console.log(err);

    res.render('index', {
      beta: CONFIG.isBeta,
      links: links
    });
  });
});

// TODO per ip cap
app.post('/click', function(req, res) {
  var id = req.body.id
    , ip = req.headers['X-Forwarded-For'];

  linkProvider.addClick(id, ip, function(err) {

    res.send({});
  });
});

app.get('/setup', function(req, res) {
  if(CONFIG.canSetup) {
    linkProvider.importLinks();
    res.send('Done');
  } else {
    res.send('Disabled');
  }
});

// Redirect all bad links
app.get('*', function(req, res) {
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
