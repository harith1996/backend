# P2P - Milestone 2 backend

Backend for Milestone 2 project

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
- Step 4: Clone the repository, including the [frontend submodule](https://gitlab.au.dk/iot-foxtrot/milestone-1/frontend). Just add `--recursive` to the clone command (`git clone --recursive <URL>`).
- Step 5: Install all of the required modules with `npm install`.

***TLDR***
```bash
sudo apt install -y nodejs npm pigpio python make gcc
sudo npm install -g node-gyp
git clone --recursive git@gitlab.au.dk:iot-foxtrot/milestone-1/backend.git
cd backend
npm install
```

## Usage
Before running the program make sure `.env` is configured correctly. **The default configuration is identical to the one that was described in the slides**: 
```env
# Port for both the frontend and API
PORT=8080
# GPIO port for the LED
GPIO_LED=4
# GPIO ports for the Ultrasonic sensor
GPIO_TRIGGER=23
GPIO_ECHO=24
# GPIO port for the Humidity and Temperature Sensor
GPIO_DHT11=12
# How often should the WebSocket send information (miliseconds) ?
UPDATE_RATE=30000
```

With the `.env` file ready you can run the program with `npm start`. If you wish to to run the program in "sim mode", without the need for a Raspberry Pi, use `npm run sim`. The displayed values in this mode will be random.

## Limitations
Root privileges are required to read the Raspberry Pi's sensors.

## Related Efforts

[Milestone 1 Frontend](https://gitlab.au.dk/iot-foxtrot/milestone-1/frontend)

## Maintainers
[Harith Rathish](https://gitlab.au.dk/au703355)

[Sam Martin Vargas Giagnocavo](https://gitlab.au.dk/au703393)

