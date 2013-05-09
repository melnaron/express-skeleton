// Load modules
var express = require('express'),
	fs 		= require('fs'),
	path 	= require('path');

// Create Express app object
var app = express();

// Setup global variables for responses
app.locals({
	title: 	'Basic Express skeleton app',
	year: 	(new Date).getFullYear().toString()
});

// Setup Express template engine
app.engine('html', require('ejs-locals'));

// Setup Express view options
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Disable 'X-Powered-By' header expose
//app.disable('x-powered-by');

// Setup Express middlewares
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

// Initialize controllers
(function requireControllers(dir, params) {
	fs.readdirSync(dir).forEach(function(file) {
		// Do not process system files or dirs (started with ".")
		if (file.match(/^\./)) {
			return;
		}

		// Get stats for each file
		var stats = fs.statSync(path.join(dir, file));

		if (stats.isFile()) {
			// Require controller
			require(path.join(dir, file)).apply(null, params);
		}
		else if (stats.isDirectory()) {
			// Recursive require controllers in sub-directories
			requireControllers(path.join(dir, file), params);
		}
	});
})(__dirname + '/controllers', [ app ]);

// Setup 404 errors middleware
app.use(function(req, res, next) {
	console.log('--> Error: 404 Not Found ('+req.url+')');
	res.status(404).send('--> Error: 404 Not Found ('+req.url+')');
});

// Setup 500 errors middleware
//app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
app.use(function(err, req, res, next) {
	console.error('--> Error: 500 Internal Server Error ('+req.url+'): '+(err.message || err));
	if (err.stack) {
		console.error(err.stack);
	}
	res.status(500).send('--> Error: 500 Internal Server Error ('+req.url+'): '+(err.message || err));
});

// Setup graceful shutdown handler
function onShutdown() {
	console.log('Exiting...');
	// Some shutdown logic here...
	// ...
	process.exit();
}

// Listen for SIGINT (CTRL+C) signal to properly stop the app
process.on('SIGINT', function() {
	console.log('\nSIGINT signal received');
	onShutdown();
});

// Listen for SIGTERM (kill -15 <pid>) signal to properly stop the app
process.on('SIGTERM', function() {
	console.log('\nSIGTERM signal received');
	onShutdown();
});

// Listen for 'uncaughtException' event
process.on('uncaughtException', function(err) {
	console.error('Exception thrown', err);
	console.error(err.stack);
	process.exit(1);
});

// Listen for requests
app.listen(7001);
console.log('App listening on port 7001...');
