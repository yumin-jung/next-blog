#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo yarn install --immutable --immutable-cache
sudo pm2 reload all