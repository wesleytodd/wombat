module.exports = function(wombat) {

	var debian = {};

	// Check if a package is installed
	debian.isPackageInstalled = function(name, done) {
		wombat.exec('dpkg-query -W ' + name, function(err) {
			done(!err);
		});
	};

	// Install package[s]
	debian.installPackages = function(packages, args, done) {
		// Convert packages to array
		if (typeof packages == 'string') {
			packages = packages.split(' ');
		}

		// Combine packages on the end of args
		args.concat(packages);

		// Exec install command
		wombat.exec('apt-get install -y ' + args.join(' '), done);
	};

	debian.removePackage = function(packages, args, done) {
		// Convert packages to array
		if (typeof packages == 'string') {
			packages = packages.split(' ');
		}

		// Combine packages on the end of args
		args.concat(packages);

		// Exec remove command
		wombat.exec('apt-get remove ' + args.join(' '), done);
	};

	return debian;

};
