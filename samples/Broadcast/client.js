
var simplemessages = require('../../');

var message = "Hello, world";
var port = 3000;
var host = "localhost";
var sleep = 1000;

if (process.argv.length > 2)
	port = parseInt(process.argv[2]);
	
if (process.argv.length > 3)
	host = process.argv[3];
	
if (process.argv.length > 4)
	message = process.argv[4];

if (process.argv.length > 5)
	sleep = parseInt(process.argv[5]);
    
var client = simplemessages.createClient(port, host);

client.on('connect', function() {
    run(client);
});

client.on('message', function(msg) {
    console.log(msg);
});

function run(client) {
    var msg = (new Date()).toString() + ": " + message;
    console.log(msg);
    client.write((new Date()).toString() + ": " + message);
    setTimeout(function() { run(client); }, sleep);
}

