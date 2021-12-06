#!/bin/bash
docker run -dp 3306:3306 --name filer-server-mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:latest
