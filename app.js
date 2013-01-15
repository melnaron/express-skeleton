// Load modules
var express = require('express'),
	engine = require('ejs-locals'),
	app = express();

// Setup Express template engine
app.engine('html', engine);

// Setup Express view options
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Setup Express middlewares
app.use(express.bodyParser());
app.use(express.cookieParser());

// Setup main route middleware
app.get('/', function(req, res) {
	res.locals.time = (new Date()).getTime().toString();
	res.locals.year = (new Date()).getFullYear().toString();
	res.render('index');
});

// Setup test route middleware
app.get('/test', function(req, res) {
	res.locals.time = getTime(); // getTime() is not defined
	res.locals.year = getYear(); // getYear() is not defined
	res.render('index');
});

// Setup 404 errors middleware
app.use(function(req, res, next) {
	console.log('--> Error: 404 Not Found ('+req.originalUrl+')');
	res.status(404).send('--> Error: 404 Not Found ('+req.originalUrl+')');
});

// Setup 500 errors middleware
//app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
app.use(function(err, req, res, next) {
	console.log('--> Error: 500 Internal Server Error ('+req.originalUrl+')');
	console.log(err.stack);
	res.status(500).send('--> Error: 500 Internal Server Error ('+req.originalUrl+')');
});

// Listen for requests
app.listen(7001);
console.log('App listening on port 7001...');
