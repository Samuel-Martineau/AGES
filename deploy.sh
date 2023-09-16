#!/bin/bash

docker build -t ages .
docker save -o ages.tar ages
scp ages.tar aws:/home/ubuntu/docker/
ssh aws "cd /home/ubuntu/docker/; docker load -i ages.tar; docker compose up -d --remove-orphans"
