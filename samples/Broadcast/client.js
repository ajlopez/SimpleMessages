
var simplemessages = require('../../'),
    net = require('net'),
    sargs = require('simpleargs');
    
// Define command line arguments
sargs.define('p', 'port', 3000, 'Server port')
    .define('h', 'host', 'localhost', 'Server name')
    .define('t', 'timeout', 1000, 'Timeout');
    
// Process arguments
var options = sargs(process.argv);

var client = simplemessages.createClient(options.port, options.host, function () { run(client); });

client.on('data', function(msg) {
    console.log(msg);
});
client.on('error', disconnect);
client.on('close', disconnect);

function run(client) {
    var msg = (new Date()).toString() + ": " + options._;
    console.log(msg);
    client.write(msg);
    setTimeout(function() { run(client); }, options.timeout);
}

function disconnect() {
    console.log('End Program');
    process.exit(0);
}