#!/usr/bin/env bash

# Install Node.js
VERSION=0.10.25
PLATFORM=linux
ARCH=x64
PREFIX="/usr/local"
 
if [ "$(which node)" == "" ] || [ "$(node -v)" != "v$VERSION" ]; then
	echo "==============================="
	echo "Installing Node"
	echo "==============================="
	mkdir -p "$PREFIX"
	curl http://nodejs.org/dist/v$VERSION/node-v$VERSION-$PLATFORM-$ARCH.tar.gz | tar xzvf - --strip-components=1 -C "$PREFIX"
	rm $PREFIX/ChangeLog $PREFIX/LICENSE $PREFIX/README.md
	echo "Node v$VERSION successfully installed!"
else
	echo "Node v$VERSION already installed!"
fi
