#!/bin/bash
fuser -k 5000/tcp

service redis start
cd ./cojs-server
npm install
npm run server
cd ../cojs-client
yarn
ng build --watch 

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY


fuser -k 5000/tcp
service redis stop
