#!/bin/bash
# Run this script every time we want a new user.
# For example: ./docker-useradd bob

# Make the user's home dir
mkdir app/home/$1
# Allow access for all users, so they can make changes
chmod -R 757 app/home/$1

# TODO: add the password to a env var rather than passing in as an arg (not here, in router.js)
# TODO: give user sudo access (might need to install sudo from the Dockerfile)

# Run a new container and create the new user inside it...
docker run -d -t -v "$(pwd)"/app/home/$1:/home/$1 --name $1-server -w /home/$1 file-server bash -c "useradd -p \$(openssl passwd -1 $2) $1 && bash"
