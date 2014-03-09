#!/usr/bin/env bash

# Set script root
SCRIPT_ROOT="unknown"
if [ -e "/vagrant/scripts/install-node.sh" ]; then
	SCRIPT_ROOT="/vagrant/scripts"
elif [ -e "/usr/local/wombat/scripts/install-node.sh" ]; then
	SCRIPT_ROOT="/usr/local/wombat/scripts"
elif [ -e "/vagrant/node_modules/wombat/scripts/install-node.sh" ]; then
	SCRIPT_ROOT="/vagrant/node_modules/wombat/scripts"
fi

# Script root not found?
if [ "$SCRIPT_ROOT" == "unknown" ]; then
	echo "Script root not found."
	exit
fi

# Detect Platform
platform="unknown"
if [ "`grep -e "[ubuntu|debian]" -i /etc/issue`" != "" ]; then
	platform="debian"
fi

# Exit if platform not supported
if [ "$platform" == "unknown" ] || [ ! -e "$SCRIPT_ROOT/$platform.sh" ]; then
	echo "Platform not supported."

	if [ "$platform" == "unknown" ]; then
		echo "Platform not detected correctly."
	fi
		
	if [ ! -e "$SCRIPT_ROOT/$platform.sh" ]; then
		echo "No platform file found."
	fi
	exit
fi

# Run platform specific provisioning
bash $SCRIPT_ROOT/$platform.sh

# Install Node.js
bash $SCRIPT_ROOT/install-node.sh

# Install and run Wombat
bash $SCRIPT_ROOT/wombat.sh
