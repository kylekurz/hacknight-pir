require('log-timestamp');
const express = require('express');
const gpio = require('rpi-gpio');
const argv = require('minimist')(process.argv.slice(2));
const port = 45331;

//get the pin from the command line or default to 7
const pin = argv["pin"] || 7;
const writePin = argv["writePin"] || 11;

//save the state for when clients connect
var state = false;

//callback when the state changes
gpio.on('change', function(channel, value) {
    console.log('Channel ' + channel + ' value is now ' + value);
    state = value;
    if (value === true) {
        io.sockets.emit('message', { message: 'The table is in use!!!' });
	gpio.write(writePin, true, function(err) {
		if (err) throw err;
		console.log('Written to pin');
	});
    } else {
        io.sockets.emit('message', { message: 'The table is free!!!' });
	gpio.write(writePin, false, function(err) {
		if (err) throw err;
		console.log('Written to pin');
	});
    }
});

//set up the gpio for writing
gpio.setup(writePin, gpio.DIR_OUT);
//set up the gpio for interrupts on both rising and falling edge
gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);

const app = express.createServer();
app.use(express.static("public"));

app.get('/', function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.sendFile('index.html');
});

const io = require('socket.io').listen(app.listen(port));

io.on('connection', function (socket) {
    console.log('Client connected');
    if (state === true) {
        socket.emit('message', { message: 'The table is in use!!!' });
    } else {
        socket.emit('message', { message: 'The table is free!!!' });
    }
});

