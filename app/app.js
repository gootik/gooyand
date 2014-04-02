/**
 * Gooyand application
 *
 * @author Sasan Hezarkhani
 */
var express = require('express')
  , connect = require('connect')
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

app.configure(function(){
  app.set('port', process.env.PORT || CONFIG.defaultPort);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(connect.compress())
  app.use(express.favicon(__dirname + '/public/favicon.ico', {maxAge: 2592000000}));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  // app.use(express.session());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

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
