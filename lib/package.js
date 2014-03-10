// Requirements
var util = require('util'),
	_ = require('lodash');

module.exports = function(wombat) {

	// Constructor
	var Package = function(name, options) {
		// Merge options
		this.options = _.extend({}, Package.defaultOptions, this.options || {}, options);

		// This package name
		this.packageName = name;
	};

	Package.defaultOptions = {
		otherPackages: {},
		forceInstall: false,
	};

	// Checks if the package is installed
	Package.prototype.isInstalled = function(done) {

		// Check for package existance
		wombat.logger.log('verbose', 'Checking for package: %s', this.packageName);
		wombat.platform.isPackageInstalled(this.packageName, function(installed) {
			if (!installed) {
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
	Package.prototype.install = function(options, done) {
		// Options is optional
		if (typeof options === 'function') {
			done = options;
			options = {};
		}

		// Build the list of packages
		var names = [this.packageName];
		for(var i in this.options.otherPackages) {
			if (this.options.otherPackages[i]) {
				names.push(i);
			}
		}

		// Exec the install command
		wombat.platform.installPackages(names, options, done);
	};

	// Remove a package
	Package.prototype.remove = function(options, done) {
		// Options is optional
		if (typeof options === 'function') {
			done = options;
			options = {};
		}

		// Build the list of packages
		var names = [this.packageName];
		for(var i in this.options.otherPackages) {
			if (this.options.otherPackages[i]) {
				names.push(i);
			}
		}

		// Exec the remove command
		wombat.platform.removePackages(names, options, done);

	};

	// Install package if not already installed
	Package.prototype.ensureInstalled = function(done) {

		// Check if it is installed
		this.isInstalled(function(installed) {
			// If not, install it
			if (this.options.forceInstall || !installed) {
				this.install(function(err) {
					if (typeof done == 'function') {
						done(err);
					}
				});
			} else {
				// Installed, just call back
				done();
			}
		}.bind(this));

	};

	// Decorate wombat
	wombat.Package = Package;
}
