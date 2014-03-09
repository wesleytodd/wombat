module.exports = function(wombat) {

	// Load plugins
	var MySQL = wombat.load('wombat-mysql');

	// Confiugre the MySQL instance
	var mysql = new MySQL({
		// Specify an optional version
		version: '5.5',
		// Set the root password
		rootPassword: 'wombat',
		// Install php bindings
		php: true,
	});
	
	// Run it
	mysql.ensureInstalled(function(err) {
		if (err) {
			return console.log('OMG, there was like an error or something!?!?!?');
		}
		console.log('All Done!!!!!!!');
	});

};
