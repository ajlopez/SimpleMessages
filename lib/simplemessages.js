
var net = require('net'),
    util = require('util');

function Channel(socket)
{
	var buffer = '';
	var closed = false;
    var channel = this;
    
    socket.on('connect', function() {
        channel.emit('connect');
    });
	
	socket.on('data', function(data) {
		buffer += data;
        for (var index = buffer.indexOf('\n'); index >= 0; index = buffer.indexOf('\n'))
        {
            var message = buffer.slice(0, index);
            buffer = buffer.slice(index + 1);
            
            if (message)
                channel.emit('message', JSON.parse(message));
        }
	});
	
	socket.on('end', function() {
		closed = true;
		channel.emit('end');
	});
    
	socket.on('close', function() {
		closed = true;
		channel.emit('close');
	});
    
    this.write = function(message) {
        if (closed)
            throw "socket is closed";
            
        socket.write(JSON.stringify(message) + '\n');
    }
    
    this.end = function() {
        closed = true;
        socket.end();
    }
}

util.inherits(Channel, process.EventEmitter);

function Server(fn)
{
	var server;
	
	server = net.createServer(function(socket) {
		fn(new Channel(socket));
	});
	
	this.listen = function(port, domain) {
		server.listen(port, domain);
	};
    
    this.close = function() { server.close(); }
}

exports.createServer = function(fn) {
    return new Server(fn);
}

exports.createClient = function(port, domain)
{
    return new Channel(net.connect(port, domain));
}

