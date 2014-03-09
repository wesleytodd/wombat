module.exports = function(wombat) {

	// Load plugins
	var Go = wombat.load('wombat-golang');
	var Postgres = wombat.load('wombat-postgres');

	var go = new Go({
	
	});
	go.install();

};
