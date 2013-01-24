// Load modules
var express = require('express'),
	engine = require('ejs-locals');

// Create Express app object
var app = express();

// Create an array of used controllers
var controllers = ['main', 'test'];

// Setup Express template engine
app.engine('html', engine);

// Setup Express view options
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Setup global app params
app.locals({
	title: 'Basic Express skeleton app',
	year: (new Date()).getFullYear().toString()
});

// Setup Express middlewares
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());

// Map controllers and thier actions
for (var i = 0; i < controllers.length; i++) {
	var controller = require('./controllers/'+controllers[i]);
	for (var j in controller) {
		var action = controller[j];
		if (['all', 'get', 'post', 'put', 'delete'].indexOf(action.method) == -1) {
			continue;
		}
		app[action.method](action.path, action.action);
		console.log('mapped: '+controllers[i]+'.'+j);
	}
}

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
