import { ACCESS_TOKEN, API_KEY } from './secret.js'

const accessToken = ACCESS_TOKEN
const apiKey = API_KEY

//geo.ipify.org API data fetch by ip
const getData = async data => {
	const ipify = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&${
		data.type === 'ip' ? `ipAddress=${data.payload}` : `domain=${data.payload}`
	}`
	updateDOM('loading')

	const resData = await (await fetch(ipify)).json()
	if (resData) updateDOM('data', resData)
	else {
		isError(true)
		updateDOM('initial')
	}
}

//leafletJs map API display and update
var mymap = L.map('mapid').setView([8.741222, 77.694626], 13)
const displayMap = () => {
	L.tileLayer(
		'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
		{
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: accessToken,
		}
	).addTo(mymap)
}
const updateMap = coordinates => {
	L.marker(coordinates).addTo(mymap)
	mymap.setView(coordinates, 13)
}

//on window load add event listeners to a button
window.onload = () => {
	$('#submit').on('touchstart click', handleClick)
	document.getElementById('input').addEventListener('keyup', handleKeyUp)
	updateDOM('initial')
}

//DOM update on changing states - initial state when page loaded, loading - loading rings when fetching data, data - when got data
const updateDOM = (state, data) => {
	const ipResult = document.getElementById('ip-result')
	const locationResult = document.getElementById('location-result')
	const timezoneResult = document.getElementById('timezone-result')
	const ispResult = document.getElementById('isp-result')

	switch (state) {
		case 'initial': {
			ipResult.innerHTML =
				locationResult.innerHTML =
				timezoneResult.innerHTML =
				ispResult.innerHTML =
					'-'
			displayMap()
			break
		}
		case 'loading': {
			let loader = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
			ipResult.innerHTML =
				locationResult.innerHTML =
				timezoneResult.innerHTML =
				ispResult.innerHTML =
					loader
			break
		}
		case 'data': {
			input.value = ''
			const coordinates = [data.location.lat, data.location.lng]
			ipResult.innerHTML = data.ip
			locationResult.innerHTML = `${data.location.city}, ${data.location.country}`
			timezoneResult.innerHTML = `UTC${data.location.timezone}`
			ispResult.innerHTML = data.isp
			updateMap(coordinates)
			break
		}
		default:
			console.log('Something went wrong!! 😢')
	}
}

//button click event
const handleClick = e => {
	e.preventDefault()
	validate(input.value)
}

//input Enter key press event
const handleKeyUp = e => e.keyCode === 13 && document.getElementById('submit').click()

//input validation
const validate = value => {
	const ipRegExp = RegExp(`^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$`)
	const domainRegExp = RegExp(`^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,6}$`)

	if (ipRegExp.test(value)) {
		isError(false)
		getData({
			type: 'ip',
			payload: value,
		})
	} else if (domainRegExp.test(value)) {
		isError(false)
		getData({
			type: 'domain',
			payload: value,
		})
	} else isError(true)
}

//show error string on bad validation
const isError = value =>
	(document.getElementById('error').style.visibility = value ? 'visible' : 'hidden')
