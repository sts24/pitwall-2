const axios = require('axios');
const fs = require('fs');

function getRaceData(loadYear) {
	return axios.get('https://ergast.com/api/f1/' + loadYear + '/results.json?limit=1000')
		.then(response => {
			return response.data;
		});
}

function getDriversData(loadYear) {
	return axios.get('https://ergast.com/api/f1/' + loadYear + '/driverStandings.json?limit=1000')
		.then(response => {
			return response.data;
		});
}

function getConstructorsData(loadYear) {
	return axios.get('https://ergast.com/api/f1/' + loadYear + '/constructorStandings.json?limit=1000')
		.then(response => {
			return response.data;
		});
}




for (let year = 1950; year < 2019; year++) {

	axios.all([
		getRaceData(year),
		getDriversData(year),
		getConstructorsData(year)
	])
		.then(axios.spread(function (raceData, driversData, constructorsData) {
			fs.writeFile('./public/data-cache/' + year + '-races.json', JSON.stringify(raceData), err => { console.log(err); });
			fs.writeFile('./public/data-cache/' + year + '-drivers.json', JSON.stringify(driversData), err => { console.log(err); });
			fs.writeFile('./public/data-cache/' + year + '-constructors.json', JSON.stringify(constructorsData), err => { console.log(err); });
		}));
}

