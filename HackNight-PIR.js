var express = require('express');
var gpio = require('rpi-gpio');
var argv = require('minimist')(process.argv.slice(2));

//get the pin from the command line or default to 7
var pin = argv["pin"]?argv["pin"]:7;

//callback when the state changes
gpio.on('change', function(channel, value) {
	    console.log('Channel ' + channel + ' value is now ' + value);
});

//set up the gpio for interrupts on both rising and falling edge
gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH);
