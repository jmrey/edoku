/*
 * Edoku, another NodeJS e-learnig CMS.
 *
 * This files is the core of application.
 * Usage: node app, or NODE_ENV=production node app
 *
 * jmrey
 * 
 */
var path = require('path')
  , fs = require('fs')
  , http = require('http')
  , express = require('express')
  , stylus = require('stylus');

var Edk = exports = module.exports = {}
  , logger = Edk.logger = require('./lib/logger');

/**
 * Load configuration file.
 */
function loadConfigFile() {
  var configFile = path.join(Edk.paths.app, 'config/conf.json');
  if (fs.existsSync(configFile)) {
    Edk.conf = require(configFile);
    logger.info('Config file has been loaded successfully!');
  } else {
    Edk.conf = {};
    logger.warn('config/conf.json is required!');
  }
};

/**
 * Configure express's instance
 */
function configureApp() {
  var app = express();
  
  app.configure(function () {
    var pub_dir = Edk.paths.public;
    /* Settings */
    app.set('port', Edk.conf.port || process.env.PORT || 3000);
    app.set('views', Edk.paths.views);
    app.set('view engine', 'jade');
    
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(stylus.middleware(pub_dir));
    app.use(express.static(pub_dir));
  });
  
  app.configure('development', function () {
    app.use(express.errorHandler());
  });
  
  Edk.App = app;
  Edk.Server = http.createServer(app);
};

Edk.paths = (function getPaths() {
  var rootPath = path.dirname(__dirname);
  return {
    root  : rootPath,
    app   : path.join(rootPath, 'app'),
    public: path.join(rootPath, 'app/public'),
    views : path.join(rootPath, 'app/views')
  };
})();

Edk.init = function init() {
  loadConfigFile();
  configureApp();
};

Edk.run = function run() {
  this.init();
  
  var app = this.App;
  this.Server.listen(app.get('port'), function () {
    logger.info("Edoku server listening on port " + app.get('port'));
  });
};
