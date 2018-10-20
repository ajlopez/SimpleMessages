
var simplemessages = require('../');
var net = require('net');

exports['Create Server and Write Message'] = function(test) {
    test.async();
    
    var server = simplemessages.createServer(function(client) {
        client.on('data', function(msg) {
            test.ok(msg);
            test.equal(msg.name, 'test');
            test.done();
            server.close();
        });
    });
    
    server.listen(3001, 'localhost');
    
    var connection = net.createConnection(3001, 'localhost');
    
    connection.write(JSON.stringify({ name: "test" }) + '\n');
    connection.end();
}

exports['Create Server and Write Ten Messages'] = function(test) {
    test.async();
    
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
    
    server.listen(3002, 'localhost');
    
    var connection = net.createConnection(3002, 'localhost');
    
    for (var k = 1; k <= 10; k++)
        connection.write(JSON.stringify({ name: "test", number: k }) + '\n');
        
    connection.end();
}

