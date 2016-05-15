HackNight-PIR
==========

A simple PIR sensor and Raspberry Pi project for sensing whether the ping pong
table is free.

Uses express to serve a web page that users can view to see the availability of
the table before heading downstairs.

## Setup
The latest Raspbian image has some issues right up front, so let's get you online
and in a good state
```
sudo vi /etc/default/keyboard
	XKBLAYOUT=”us”
sudo raspi-config
	We’ll talk through options here
sudo vi /etc/wpa_supplicant/wpa_supplicant.conf
	ssid=”Hack Night”
	psk=”sw1tchv0x”
sudo reboot
```

Now that we're online and stable, let's get the right packages on the system
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get remove nodejs-legacy
sudo apt-get autoremove
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
```
We have our core packages, now we need to tell npm to get the dependencies
```
npm install
```

## Usage
Once you have your sensor wired up (code expects pin 7 for input), simply run:
```
sudo node HackNight-PIR.js
```

