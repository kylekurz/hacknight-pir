require('log-timestamp');
const gpio = require('rpi-gpio');
const argv = require('minimist')(process.argv.slice(2));

//get the pin from the command line or default to 17
const pin = argv["pin"] || 11;

var delay = 2000;
var count = 0;
var max   = 10;

gpio.setup(pin, gpio.DIR_OUT, on);

function on() {
	if (count >= max) {
		gpio.destroy(function() {
			console.log('Closed pins, now exit');
		});
		return;
	}

	setTimeout(function() {
		gpio.write(pin, 1, off);
		count += 1;
	}, delay);
}

function off() {
	setTimeout(function() {
		gpio.write(pin, 0, on);
	}, delay);
}


