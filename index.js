// Requirements
var 
	fs = require('fs'),
	winston = require('winston'),
	wombatfile = require('./lib/wombatfile'),
	platformDetect = require('./lib/platform-detect')
	plugin = require('./lib/plugin'),
	exec = require('./lib/exec'),
	package = require('./lib/package'),
	service = require('./lib/service'),
	logger = require('./lib/logger')
;

// Wombat constructor
var Wombat = module.exports = function(options) {

	// Set options
	this.options = options;

	// Default cwd
	this.options.cwd = this.options.cwd || process.cwd();

	// Decorate with logger
	logger(this);

	// Log init
	this.log('info', 'Initalizing...');
	this.log('verbose', 'Options: ', this.options);

	// Decorate with the platform driver
	var p = platformDetect();
	try {
		this.platform = require('./' + path.join('lib', 'platforms', p + '.js'))(this);
	} catch(e) {
		// Fail if platform is not supported
		this.log('error', 'Platform not supported', e, p);
		process.exit(1);
	}
	this.log('verbose', 'Platform detected: %s', p);
	
	// Decorate with plugins
	plugin(this);

	// Decorate with exec
	exec(this);

	// Decorate with package
	package(this);

	// Decorate with service
	service(this);

	// Load wombatfile and call the config function
	wombatfile.load(this.options.cwd, function(err, filepath, configFnc) {

		// Exit on error
		if (err) {
			this.log('error', 'Initalization Error', err);
			this.log('error', err.stack);
			process.exit(2);
		}

		// Log loaded file
		this.log('info', 'Wombatfile: %s', filepath);

		// Call config function
		try {
			configFnc(this);
		} catch(err) {
			this.log('error', 'Config Error', err);
			this.log('error', err.stack);
			process.exit(3);
		}
		
	}.bind(this));

};

// Load the package.json to get version
try {
	// Get path to package.json
	var pkgPath = path.join(__dirname, 'package.json');

	// Load the file
	var pkg = fs.readFileSync(pkgPath, {encoding: 'utf8'});
	pkg = JSON.parse(pkg);

	// Add version to rufio
	Wombat.version = pkg.version;
} catch(err) {
	console.error('Failed to load package.json, version unknown');
}
