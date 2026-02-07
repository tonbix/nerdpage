"use strict";


const greetings = {
	"universal": [ "hi", "hiiii", "hello", "yo", "whats up", "you cannot hide", "HEEELLOOOOOO", "HIIIIIIII"],
	"night": [ "good night", "gn", "gute nacht", "buona notte", "gpod nigjt" ],
	"morning": [ "good morning", "gm", "guten morgen", "buongiorno", "good mornign" ],
	"afternoon": [ "good afternoon", "ga", "guten tag", "buon pomeriggio", "goid adternoon" ],
	"evening": [ "good evening", "ge", "guten abend", "buonasera", "gopd evning"]
}

const getTimeOfDay = () => {
	const now = new Date();
	const hour = now.getHours();

	if (hour < 6) return "night";
	if (hour < 12) return "morning";
	if (hour < 18) return "afternoon";
	return "evening"
}

document.addEventListener("DOMContentLoaded", () => {
	const greetElement = document.getElementById("greet");

	const timeOfDay = getTimeOfDay();

	const matchingGreetings = greetings[timeOfDay].concat(greetings["universal"]);

	const greeting = matchingGreetings[Math.floor(Math.random() * matchingGreetings.length)];

	greetElement.textContent = `${greeting}, ${USERNAME}`;
});

