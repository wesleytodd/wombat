module.exports = function(wombat) {

	var debian = {};

	// Check if a package is installed
	debian.isPackageInstalled = function(name, done) {
		wombat.exec('dpkg-query -W ' + name, function(err) {
			done(!err);
		});
	};

	// Install package[s]
	debian.installPackages = function(packages, options, done) {
		// Process args
		// @TODO Support install arguments
		var args = [];

		// Combine packages on the end of args
		args = args.concat(packages);

		// Exec install command
		wombat.exec('apt-get install -y ' + args.join(' '), done);
	};

	// Remove package[s]
	debian.removePackages = function(packages, options, done) {
		// Process args
		var args = [];

		// Purge?
		if (options.purge) {
			args.push('--purge');
		}

		// Combine packages on the end of args
		args = args.concat(packages);

		// Exec remove command
		wombat.exec('apt-get remove ' + args.join(' '), done);
	};

	// Start a service
	debian.startService = function(name, done) {
		wombat.exec('service ' + name + ' start', done);
	};

	// Stop a service
	debian.stopService = function(name, done) {
		wombat.exec('service ' + name + ' stop', done);
	};

	// Restart a service
	debian.restartService = function(name, done) {
		wombat.exec('service ' + name + ' restart', done);
	};

	return debian;

};
