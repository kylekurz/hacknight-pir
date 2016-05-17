#!/bin/bash

doInstall ()
{
#install all the dependencies
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get remove nodejs-legacy
sudo apt-get autoremove
sudo apt-get install -y nginx vim
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

#do the nginx linking
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -s `pwd`/HackNight-PIR.nginx /etc/nginx/sites-enabled/HackNight-PIR.nginx
sudo /etc/init.d/nginx restart
}

#warn that we use sudo and change the system
while true; do
	read -p "This script will use several sudo commands to update
your system and set it up for running the HackNight-PIR
code. Do you wish to continue? " yn
	case $yn in
		[Yy]* ) doInstall; break;;
		[Nn]* ) break;;
		* ) echo "Please answer yes or no. ";;
	esac
done

