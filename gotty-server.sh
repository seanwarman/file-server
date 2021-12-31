#!/bin/bash
# Run this script as a part of the startup of the app.

docker build -t file-server .

if [-z $1]; then
  port=8080
else
  port=$1
fi

# Runs gotty ready for the arguments to log in as a specific user...
./gotty -w -p $port --config .gotty --permit-arguments docker exec -it -u

# Example:
# http://myserve.org:8080/?arg=sean&arg=sean-server&arg=bash
#                              ^user    ^container      ^exec command
