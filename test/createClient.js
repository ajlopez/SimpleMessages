
var simplemessages = require('../'),
    net = require('net');

exports['Connect to Server and Write Message'] = function(test) {
    test.expect(2);
    
    var server = simplemessages.createServer(function(client) {
        client.on('data', function(msg) {
            test.ok(msg);
            test.equal(msg.name, 'test');
            test.done();
            server.close();
        });
    });
    
    server.listen(5000, 'localhost');
    
    var socket = net.connect(5000, 'localhost');
    var client = simplemessages.createClient(socket);

    socket.on('connect', function() {
        client.write({ name: "test" });
        client.end();
    });
}

exports['Connect to Server using port and host and callback'] = function(test) {
    test.expect(2);
    
    var server = simplemessages.createServer(function(client) {
        client.on('data', function(msg) {
            test.ok(msg);
            test.equal(msg.name, 'test');
            test.done();
            server.close();
        });
    });
    
    server.listen(5000, 'localhost');
    
    var client = simplemessages.createClient(5000, 'localhost', function() {
        client.write({ name: "test" });
        client.end();
    });
}

exports['Connect to Server and Write Ten Messages'] = function(test) {
    test.expect(30);
    
    var nmsg = 0;
    
    var server = simplemessages.createServer(function(client) {
        client.on('data', function(msg) {
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
    
    var socket = net.connect(5000, 'localhost');
    var client = simplemessages.createClient(socket);
    
    socket.on('connect', function() {
        for (var k = 1; k <= 10; k++)
            client.write({ name: "test", number: k });
            
        client.end();
    });
}

exports['Connect to Server and Receive Message'] = function(test) {
    test.expect(3);
    
    var server = simplemessages.createServer(function(client) {
        test.ok(client);
        client.write({ name: "test"});
    });
    
    server.listen(5000, 'localhost');
    
    var socket = net.connect(5000, 'localhost');
    var client = simplemessages.createClient(socket);
    
    client.on('data', function(msg) {
        test.ok(msg);
        test.equal(msg.name, "test");
        test.done();
        client.end();
        server.close();
    });
}

exports['Connect to Server and Receive Ten Messages'] = function(test) {
    test.expect(31);
    
    var server = simplemessages.createServer(function(client) {
        test.ok(client);
        for (var k = 1; k <= 10; k++)
            client.write({ name: "test", number: k });
    });
    
    server.listen(5000, 'localhost');
    
    var socket = net.connect(5000, 'localhost');
    var client = simplemessages.createClient(socket);
    var nmsg = 0;
    
    client.on('data', function(msg) {
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
}
