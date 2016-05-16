#!/bin/bash

#install all the dependencies
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get remove nodejs-legacy
sudo apt-get autoremove
sudio apt-get install -y nginx
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
rm -f node_latest_armhf.deb

#hack the keyboard to US
sudo sed -i 's/XKBLAYOUT="gb"/XKBLAYOUT="us"/'

#update the wpa_supplicant.conf
sudo echo 'network={
	ssid="Hack Night"
	psk="sw1tchv0x"
}' >> wpa_supplicant.conf

#install the node modules
npm install
PWD=`pwd`
echo $PWD

#do the nginx linking
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s $PWD/HackNight-PIR.nginx /etc/nginx/sites-enabled/HackNight-PIR.nginx
sudo /etc/init.d/nginx restart
