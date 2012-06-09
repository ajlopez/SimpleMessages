
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
	
	server.listen(5000, 'localhost');
	
	var client = simplemessages.createClient();

    client.on('connect', function() {
        client.write({ name: "test" });
        client.end();
    });
    
    client.connect(5000, 'localhost');
}

exports['Connect to Server and Write Ten Messages'] = function(test) {
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
	
	server.listen(5000, 'localhost');
	
	var client = simplemessages.createClient();
	
    client.on('connect', function() {
        for (var k = 1; k <= 10; k++)
            client.write({ name: "test", number: k });
            
        client.end();
    });
    
    client.connect(5000, 'localhost');
}

exports['Connect to Server and Receive Message'] = function(test) {
    test.expect(3);
    
	var server = simplemessages.createServer(function(channel) {
        test.ok(channel);
        channel.write({ name: "test"});
	});
	
	server.listen(5000, 'localhost');
	
	var client = simplemessages.createClient();
    
    client.on('message', function(msg) {
        test.ok(msg);
        test.equal(msg.name, "test");
        test.done();
        client.end();
        server.close();
    });
    
    client.connect(5000, 'localhost');
}

exports['Connect to Server and Receive Ten Messages'] = function(test) {
    test.expect(31);
    
	var server = simplemessages.createServer(function(channel) {
        test.ok(channel);
        for (var k = 1; k <= 10; k++)
            channel.write({ name: "test", number: k });
	});
	
	server.listen(5000, 'localhost');
	
	var client = simplemessages.createClient();
    var nmsg = 0;
    
    client.on('message', function(msg) {
        test.ok(msg);
        test.equal(msg.name, 'test');
        nmsg++;
        test.equal(msg.number, nmsg);
        
        if (nmsg == 10) {
            test.done();                
            client.end();
            server.close();
        }
    });
    
    client.connect(5000, 'localhost');
}
