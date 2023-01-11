#!/bin/bash
# Run this script as a part of the startup of the app.

docker build -t file-server .

MASTER_USER=$(awk -F "=" '/MASTER_USER/ {print $2}' .env)
MASTER_PASSWORD=$(awk -F "=" '/MASTER_PASSWORD/ {print $2}' .env)

# Runs gotty ready for the arguments to log in as a specific user.
# The first arg for this script is a user:password combination...
./gotty -w -p 8080 -c $MASTER_USER:$MASTER_PASSWORD --config .gotty --permit-arguments docker exec -it -u || \
gotty -w -p 8080 -c $MASTER_USER:$MASTER_PASSWORD --config .gotty --permit-arguments docker exec -it -u

# Example:
# http://myserve.org:8080/?arg=sean&arg=sean-server&arg=bash
#                              ^user    ^container      ^exec command
