echo "==============================="
echo "Updating Packages"
echo "==============================="
apt-get update
apt-get -y upgrade

echo "==============================="
echo "Installing Packages"
echo "==============================="
apt-get -y install vim make git build-essential

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
fi
