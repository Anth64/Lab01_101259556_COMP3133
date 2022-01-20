/*
 * Lab 01 - COMP3133
 * Anthony Giugni - 101259556
 * 20-JAN-2022
 */
const csv = require('csv-parser');
const fs = require('fs');
const country_data = [];

// Check if canada.txt exists.
try {
	// if it exists, remove it.
	if(fs.existsSync('canada.txt')) {
		fs.unlinkSync('canada.txt');
		console.log('canada.txt was deleted.');
	}
}
catch(err) {
	console.error(err);
}


// Check if usa.txt exists.
try {
	// if it exists, remove it.
	if(fs.existsSync('usa.txt')) {
		fs.unlinkSync('usa.txt');
		console.log('usa.txt was deleted.');
	}
}
catch(err) {
	console.error(err);
}

// Read in csv file.
fs.createReadStream('input_countries.csv')
	.pipe(csv())
	.on('data', (data) => country_data.push(data))
	.on('end', () => { 
		parse_data(country_data);
	});

function parse_data(data) {
	let canada = [], usa = [];
	for(let i = 0; i < data.length; i++) {
		let entry = '';
		if(data[i].country === 'Canada') {
			entry = data[i].country + ', ' + data[i].year + ', ' + data[i].population;
			canada.push(entry);
		}
		else if(data[i].country === 'United States') {
		 	entry = data[i].country + ', ' + data[i].year + ', ' + data[i].population;
			usa.push(entry);
		}
	}
	let canada_file = fs.createWriteStream('canada.txt');
	canada_file.on('error', function(err) {} );
	canada.forEach(value => canada_file.write(`${value}\n`));
	canada_file.on('finish', () => {
		canada_file.end();
	});
	
	let usa_file = fs.createWriteStream('usa.txt');
	usa_file.on('error', function(err) {} );
	usa.forEach(value => usa_file.write(`${value}\n`));
	usa_file.on('finish', () => {
		usa_file.end();
	});
}
