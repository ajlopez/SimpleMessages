
var simplemessages = require('../../'),
    sargs = require('simpleargs');
    
// Define command line arguments
sargs.define('p', 'port', 3000, 'Server port')
    .define('h', 'host', 'localhost', 'Server name')
    .define('t', 'timeout', 1000, 'Timeout')
    .defineValue('message', 'Hello, world', 'Message to send');
    
// Process arguments
var options = sargs.process(process.argv);
    
var client = simplemessages.createClient();

client.on('connect', function() {
    run(client);
});

client.on('message', function(msg) {
    console.log(msg);
});

client.connect(options.port, options.host);

function run(client) {
    var msg = (new Date()).toString() + ": " + options.message;
    console.log(msg);
    client.send(msg);
    setTimeout(function() { run(client); }, options.timeout);
}

