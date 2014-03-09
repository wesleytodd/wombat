module.exports = function(wombat) {

	// Constructor
	var Service = function(name) {
		this.serviceName = name;
	};

	// Start a service
	Service.prototype.start = function(done) {
		wombat.platform.startService(this.serviceName, done);
	};

	// Stop a service
	Service.prototype.stop = function(done) {
		wombat.platform.stopService(this.serviceName, done);
	};

	// Restart a service
	Service.prototype.restart = function(done) {
		wombat.platform.restartService(this.serviceName, done);
	};

	// Decorate wombat
	wombat.Service = Service;
};
