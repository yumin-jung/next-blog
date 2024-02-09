#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo yarn install --immutable --immutable-cache
sudo npx pm2 reload all