
var net = require('net'),
    util = require('util'),
    os = require('objectstream');

function Server(fn)
{
    var server;
    
    server = net.createServer(function(socket) {
        fn(os.createStream(socket));
    });
    
    this.listen = function(port, domain) {
        server.listen(port, domain);
    };
    
    this.close = function() { server.close(); }
}

exports.createServer = function(fn) {
    return new Server(fn);
}

exports.createClient = function(socket)
{
    return os.createStream(socket);
}

