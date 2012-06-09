
var simplemessages = require('../../'),
    sargs = require('simpleargs');
    
// Define command line arguments
sargs.define('p', 'port', 3000, 'Server port')
    .define('h', 'host', 'localhost', 'Server name')
    .define('t', 'timeout', 1000, 'Timeout')
    .defineValue('message', 'Hello, world', 'Message to send');
    
// Process arguments
var options = sargs.process(process.argv);
    
var client = simplemessages.createClient(options.port, options.host);

client.on('connect', function() {
    run(client);
});

client.on('message', function(msg) {
    console.log(msg);
});

function run(client) {
    var msg = (new Date()).toString() + ": " + options.message;
    console.log(msg);
    client.write(msg);
    setTimeout(function() { run(client); }, options.timeout);
}

