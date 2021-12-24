#!/bin/bash
# Run this script every time we want a new user.
# For example: ./docker-useradd bob

# Make the user's home dir
mkdir home/$1
# Allow access for all users, so they can make changes
chmod -R 757 home/$1
# Run a new container and create the new user inside it...
docker run -d -t -v "$(pwd)"/home/$1:/home/$1 --name $1-server -w /home/$1 file-server bash -c "useradd -m $1 && bash"
