# Raspberry Pi Monitor

A simple web app for monitoring sensors connceted to a Raspberry Pi. Built with Angular and Express on NodeJS 
## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Limitations](#limitations)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)


## Install
- Step 1: Install NodeJS and NPM (`apt install nodejs npm`).
- Step 2: This project uses the `pigpio` node modules so one should make sure the `pigpio` package is installed (`apt install pigpio`).
- Step 3 If the Pi is not using a recent version of NodeJS it might have to compile some things in order to get the `better-sqlite3` module up and running. `python`, `make`, `gcc` (`apt install python make gcc`) and `node-gyp` (`npm install -g node-gyp`) are required. To skip this step just use a [LTS release of NodeJS](https://nodejs.org/en/about/releases/).
- Step 4: Clone the repository, including the [frontend submodule](https://github.com/harith1996/frontend/). Just add `--recursive` to the clone command (`git clone --recursive <URL>`).
- Step 5: Install all of the required modules with `npm install`.

***TLDR***
```bash
sudo apt install -y nodejs npm pigpio python make gcc
sudo npm install -g node-gyp
git clone --recursive git@github.com:harith1996/rpi-web-server.git
cd backend
npm install
```

## Usage

Before running this app, you should make sure that your RPi is publishing sensor data onto an MQTT broker that's accessible. The format for publishing, along with a [simple MQTT client that runs on an RPi is given here](https://github.com/harith1996/mqtt-rpi-client). 

Additonally, make sure `.env` is configured correctly: 
```env
# Port for both the frontend and API
PORT=8080

# Hostname of MQTT broker
MQTT_BROKER='broker'

# Websocket port number on MQTT broker
MQTT_WS_PORT=8883

# Normal TCP port number on MQTT broker
MQTT_PORT=1883

# Credentials for publishing onto MQTT broker
MQTT_USER=iotp2p
MQTT_PWD=milestone2
```

With the `.env` file ready you can run the program with `npm start`. 

## Limitations
Root privileges are required to read the Raspberry Pi's sensors.

## Related Efforts

[Frontend](https://github.com/harith1996/frontend/)

## Maintainers
[Harith Rathish](https://github.com/harith1996)

[Sam Martin Vargas Giagnocavo](https://github.com/smvg)

