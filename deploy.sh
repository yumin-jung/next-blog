#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo yarn install
sudo yarn build
sudo pm2 reload all