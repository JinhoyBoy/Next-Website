# Next project
## Features
- Weather data from API
- Stock data from API
- HTML Canvas for making signatures
- RSS News Feed

## Screenshots
### Weather Forecast
![Screenshot](https://i.ibb.co/R4ZDtrf/Bildschirmfoto-2024-11-15-um-18-53-00.png)
### RSS-News
![Screenshot](https://i.ibb.co/vLDGXvd/Bildschirmfoto-2024-11-15-um-18-52-41.png)
### Stock Data
![Screenshot](https://i.ibb.co/s6Q8sq3/Bildschirmfoto-2024-11-15-um-18-53-50.png)
### HTML Canvas
![Screenshot](https://i.ibb.co/9Nz8LY4/Bildschirmfoto-2024-11-15-um-18-53-20.png)

## Start project

### With npm:
#### Start
1. `npm install`
2. `npm run dev`
- Application normally accessible at http://localhost:3000

### With Docker
#### Start
1. `docker build -t imagename .`
2. `docker run -p 3000:3000 imagename`
- imagename can be any name
- Application accessible at http://localhost:3000
#### Exit
1. `docker ps ` then look up the ID of the running image (e.g. 123456789abc)
2. `docker stop 123456789abc` (enter the image ID)

## ENV variables
Environment variables can be changed in the existing .env.local file. These contain the API key for weather data and stock data.
