
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},

	// add business markers
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}

// get coordinates via geolocation api
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: ''
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}
// process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

getFoursquare()

// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
    console.log(business)
    const businessType = await getFoursquare(business)
	let data = await getFoursquare(business)
	myMap.businessType= processBusinesses(business)
	myMap.addMarkers()
})

const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'fsq3ZTtGW5noiwC0FWF8uDRdgG7oH9oI29eAC8enZR4BA0Q='
	}
  };
  
  fetch('https://api.foursquare.com/v3/places/search?query=restaurants', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

	const hospitals = {
		method: 'GET',
		headers: {
		  accept: 'application/json',
		  Authorization: 'fsq3ZTtGW5noiwC0FWF8uDRdgG7oH9oI29eAC8enZR4BA0Q='
		}
	  };
	  
	  fetch('https://api.foursquare.com/v3/places/search?query=hospitals', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

		const hotels = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  Authorization: 'fsq3ZTtGW5noiwC0FWF8uDRdgG7oH9oI29eAC8enZR4BA0Q='
			}
		  };
		  
		  fetch('https://api.foursquare.com/v3/places/search?query=hotels', options)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));

			const gasStation = {
				method: 'GET',
				headers: {
				  accept: 'application/json',
				  Authorization: 'fsq3ZTtGW5noiwC0FWF8uDRdgG7oH9oI29eAC8enZR4BA0Q='
				}
			  };
			  
			  fetch('https://api.foursquare.com/v3/places/search?query=gas%20stations', options)
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(err => console.error(err));