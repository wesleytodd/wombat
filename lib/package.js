// Requirements
var util = require('util');

module.exports = function(wombat) {

	// Constructor
	var Package = function(name, others) {
		// This package name
		this.packageName = name;

		// Other package requirements or extras
		this.otherPackages = others || [];
	};

	// Checks if the package is installed
	Package.prototype.isInstalled = function(done) {

		// Check for package existance
		wombat.logger.log('verbose', 'Checking for package: %s', this.packageName);
		wombat.exec('dpkg-query -W ' + this.packageName, function(err) {
			if (err) {
				// Package not installed
				wombat.logger.log('verbose', '%s not found', this.packageName);
				return done(false);
			}

			// Package installed
			wombat.logger.log('verbose', '%s installed', this.packageName);
			done(true);
		}.bind(this));

		// Chainable
		return this;
	};

	// Install package
	Package.prototype.install = function(done) {
		// Build the list of packages
		var names = this.otherPackages;
		names.unshift(this.packageName);

		// Exec the install command
		wombat.exec(util.format('apt-get install -y %s', names.join(' ')), done);
	};

	// Remove a package
	Package.prototype.remove = function(options, done) {
		// Options is optional
		if (typeof options === 'function') {
			done = options;
			options = {};
		}

		// Construct args
		var args = [];

		// Purge?
		if (options.purge) {
			args.push('--purge');
		}

		// Build the list of packages
		var names = this.otherPackages;
		names.unshift(this.packageName);

		// Exec the remove command
		wombat.exec('apt-get remove ' + args.join(' ') + ' ' + names.join(' '));

	};

	// Decorate wombat
	wombat.Package = Package;
}
