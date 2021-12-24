#!/bin/bash
# Run this script as a part of the startup of the app.

docker build -t file-server .

# Runs gotty ready for the arguments to log in as a specific user...
./gotty -w -p 8080 --config .gotty --permit-arguments docker exec -it -u

# Example:
# http://myserve.org:8080/?arg=sean&arg=sean-server&arg=bash
#                              ^user    ^container      ^exec command
