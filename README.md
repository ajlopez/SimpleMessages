# SimpleMessages

Simple bidirectional JSON message channels using net sockets.

## Installation

Via npm on Node:

```
npm install simplemessages
```

Reference it from your program:

```js
var simplemessages = require('simplemessages');
```

## Usage

Server side

```js
var server = simplemessages.createServer(function(channel) {
	channel.on('message', function(msg) {
		// each message process here
	});
});

server.listen(8000);
```

Sending a message (any Javascript value that can be processed by JSON.stringify

```js
server.send(msg);
```

Client side

```js
var client = simplemessages.createClient();

client.on('connect', function() {
	client.send({ name: "my message" });
	// use client.send(msg) to send a message to the server
	
	// when done, close the client channel
	client.end();
});

client.connect(8000, remotehost);

```

## Development

```
git clone git://github.com/ajlopez/SimpleMessages.git
cd SimpleMessages
npm install
npm test
```

## Samples

- [Broadcast](https://github.com/ajlopez/SimpleMessages/tree/master/samples/Broadcast) Broadcast messages to all connected client.

## Versions

- 0.0.1: Published
- 0.0.2: Published
- 0.0.3: In master, under development. Refactored to use ObjectStream.

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleMessages) and submit
[pull requests](https://github.com/ajlopez/SimpleMessages/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

(Thanks to [JSON5](https://github.com/aseemk/json5) by [aseemk](https://github.com/aseemk). 
This file is based on that project README.md).

