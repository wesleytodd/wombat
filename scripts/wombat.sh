#!/usr/bin/env bash

# Check that it is installed
if [ "$(which wombat)" == "" ]; then
	if [ -e "/usr/local/wombat" ]; then
		echo "Linkning local version of Wombat"
		cd /usr/local/wombat && npm link && cd -
	else
		echo "Installing Wombat from NPM"
		npm install -g wombat
	fi
	echo "Wombat installed"
else
	echo "Wombat already installed"
fi

# Run wombat
wombat provision -d "/vagrant" -v
