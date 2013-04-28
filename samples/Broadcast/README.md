# Broadcast sample

One server broadcasting message to n client. Each client sends a message to
the server.

## Installation

```
npm install
```

## Run

Start the server in a console:

```
node server
```

Options:
- `-p <port>`, `--port <port>`: Port to listen. Default value: 3000

Start a client in a console
```
node client
```

Options:
- `-h <host>`, `--host <host>`: Server host. Default value: localhost
- `-p <port>`, `--port <port>`: Server port. Default value: 3000
- `-t <timeout>`, `--timeout <timeout>`: Timeout between message, in milliseconds. Default value: 1000
- `<message>`: Message to send. Default value: `Hello world`

Examples:
```
node client hi
node client -p 3000 -h localhost hi
node client --timeout 2000 hi
```

