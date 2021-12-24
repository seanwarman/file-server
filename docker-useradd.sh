#!/bin/bash
# Run this script every time we want a new user.

# For example: ./docker-useradd bob
mkdir home/$1
chmod -R 757 home/$1
# Run a new container and create a new user inside it...
docker run -d -t -v "$(pwd)"/home/$1:/home/$1 --name $1-server -w /home/$1 file-server bash -c "useradd -m $1 && bash"
