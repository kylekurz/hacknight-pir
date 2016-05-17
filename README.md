HackNight-PIR
==========

A simple PIR sensor and Raspberry Pi project for sensing whether the ping pong
table is free.

Uses express to serve a web page that users can view to see the availability of
the table before heading downstairs.

## Initial configuration
Run:
```
sudo raspi-config
```
Select the following options:
```
Expand Filesystem
Boot Options -> B1 Console
Advanced Options -> SSH -> Enable
```
Exit and select 'Yes' to reboot now

## Easy Setup
Run the setup script (need internet for this) and reboot
```
./setup.sh
reboot & exit
```

## Manual Setup
The latest Raspbian image has some issues right up front, so let's get you online
and in a good state:
```
sudo vi /etc/default/keyboard
```
We need to set the keyboard to US (default is GB)
```
XKBLAYOUT=”us”
```
Some additional steps are needed to ensure access and set up the rest of the Pi,
we'll talk through the options as we go.
```
sudo raspi-config
```
We need to add the network to the wifi configuration
```
sudo vi /etc/wpa_supplicant/wpa_supplicant.conf
```
Copy this into there:
```
network={
	ssid=”Hack Night”
	psk=”sw1tchv0x”
}
```
Reboot your device and it should hop online so you can SSH to it.
```
sudo reboot
```

Now that we're online and stable, let's get the right packages on the system
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get remove nodejs-legacy
sudo apt-get autoremove
sudio apt-get install -y nginx
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
```
We have our core packages, now we need to tell npm to get the dependencies
```
npm install
```
Finally, we need to copy our nginx config into place
```
cd /etc/nginx/sites-enabled
sudo rm default
sudo ln -s ~/Git/hacknight-pir/HackNight-PIR.nginx HackNight-PIR.nginx
```

## Usage
Once you have your sensor wired up (code defaults to pin 7 for input if not specified), simply run:
```
sudo node HackNight-PIR.js
```
or
```
sudo node HackNight-PIR.js --pin=17
```

