
var simplemessages = require('../../');

function Broadcaster()
{
	var nclients = 0;
	var clients = {};
	var broadcaster = this;
	
	this.newClient = function(client) {
        console.log("New Client");
		client.nclient = nclients++;
		clients[client.nclient] = client;
		client.on('message', function(msg) { broadcaster.broadcast(client, msg); });
		client.on('end', function() { broadcaster.removeClient(client); });
		client.on('close', function() { broadcaster.removeClient(client); });
	}
	
	this.removeClient = function(client) {
        console.log("Remove Client");
		delete clients[client.nclient];
	}
	
	this.broadcast = function(source, msg) {
		for (var n in clients)
		{
			var client = clients[n];
			if (client == source)
				continue;
			try {
				client.write(msg);
			}
			catch (ex) {
				console.log(ex.toString());
			}
		}
	}
}

var broadcaster = new Broadcaster();

var server = simplemessages.createServer(function(client) { broadcaster.newClient(client); });

var port = 3000;

if (process.argv.length > 2)
    port = parseInt(process.argv[2]);
    
server.listen(port);

