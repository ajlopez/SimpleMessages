
var simplemessages = require('../'),
	net = require('net');

exports['Connect to Server and Write Message'] = function(test) {
    test.expect(2);
    
	var server = simplemessages.createServer(function(channel) {
		channel.on('message', function(msg) {
			test.ok(msg);
			test.equal(msg.name, 'test');
			test.done();
            server.close();
		});
	});
	
	server.listen(4000, 'localhost');
	
	var client = simplemessages.createClient(4000, 'localhost');

    client.on('connect', function() {
        client.write({ name: "test" });
        client.end();
    });
}

exports['Connect  to Server and Write Ten Messages'] = function(test) {
    test.expect(30);
    
    var nmsg = 0;
    
	var server = simplemessages.createServer(function(channel) {
		channel.on('message', function(msg) {
			test.ok(msg);
			test.equal(msg.name, 'test');
            nmsg++;
            test.equal(msg.number, nmsg);
            
            if (nmsg == 10) {
                test.done();                
                server.close();
            }
		});
	});
	
	server.listen(4001, 'localhost');
	
	var client = simplemessages.createClient(4001, 'localhost');
	
    client.on('connect', function() {
        for (var k = 1; k <= 10; k++)
            client.write({ name: "test", number: k });
            
        client.end();
    });
}

