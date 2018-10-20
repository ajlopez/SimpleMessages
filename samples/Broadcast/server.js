
var simplemessages = require('../../');
var sargs = require('simpleargs');
   
function Broadcaster()
{
    var nclients = 0;
    var clients = {};
    var broadcaster = this;
    
    this.newClient = function(client) {
        console.log("New Client");
        client.nclient = nclients++;
        clients[client.nclient] = client;
        client.on('data', function(msg) { broadcaster.broadcast(client, msg); });
        client.on('error', function() { broadcaster.removeClient(client); });
        client.on('end', function() { broadcaster.removeClient(client); });
        client.on('close', function() { broadcaster.removeClient(client); });
    }
    
    this.removeClient = function(client) {
        if (clients[client.nclient]) {
            console.log("Remove Client");
            delete clients[client.nclient];
        }
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

sargs.define('p', 'port', 3000, 'Port to listen');
var options = sargs(process.argv);
    
server.listen(options.port);
console.log("Listening on port", options.port);

