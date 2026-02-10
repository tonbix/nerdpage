"use strict";

import settings from "../data/settings.json" with { type: "json" };

const WEATHER_CODES = {
    0: "SUNNY",
    1: "MAINLY CLEAR", 2: "PARTLY CLOUDY", 3: "OVERCAST",
    45: "FOGGY", 48: "RIME FOG",
    51: "LIGHT DRIZZLE", 53: "DRIZZLE", 55: "HEAVY DRIZZLE",
    61: "LIGHT RAIN", 63: "RAIN", 65: "HEAVY RAIN",
    71: "LIGHT SNOW", 73: "SNOW", 75: "HEAVY SNOW",
    95: "THUNDERSTORM"
};


const getLocation = () => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject("cannot get location");
		}

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lat: pos.coords.latitude,
					lon: pos.coords.longitude
				});
			},
			(err) => {
				reject(`Error: ${err.message}`);
			},
			{
				enableHighAccuracy: false,
				timeout: 5000,
				maximumAge: 0
			}
		);
	});
};


const updateWeather = async () => {
	const weatherElement = document.getElementById("weather");

	try {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${settings.location.lat}&longitude=${settings.location.lon}&current_weather=true`;

		const response = await fetch(url);
		if (!response.ok) throw new Error("no internet connection");

		const data = await response.json();
		const temp = Math.round(data.current_weather.temperature);
		const code = data.current_weather.weathercode;

		const condition = WEATHER_CODES[code] || "";
		const sign = temp > 0 ? "+" : "";

		weatherElement.textContent = `weather: ${sign}${temp}, ${condition}`;
	} catch (err) {
		console.log(err);
		weatherElement.textContent = `weather: err`;
	}
};

updateWeather();

