# Wombat

**This software is pre-alpha:** I have just started this project, and it is under active development.  It is not tested and subject to un-announced API changes.

Provision your servers with javascript.  Finally you don't need Ruby anymore.  Yeah, awesome right?  And even if you program in Ruby, this tool is for you.  Because Puppet is confusing, and who really wants to write configuration anyway.  Wombat uses a strightforward programmitic approach to provisioning your server:

```javascript
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
	mysql.ensureInstalled(function() {
		if (err) {
			return console.log('OMG, there was like an error or something!?!?!?');
		}
		console.log('All Done!!!!!!!');
	});

};
```

All you need to provision a server with Wombat is Node.js installed.  Wombat uses a plugin archetecture to and NPM to distribute re-usable modules for common software.  But for any custom actions all you need is the Wombat core libraries, which provide common helper methods for setting up your environment.
