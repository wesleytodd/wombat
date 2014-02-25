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

	return debian;

};
