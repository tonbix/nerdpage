"use strict";


const updateDateTime= () => {
	const dateTimeElement = document.getElementById("datetime");
	if (!dateTimeElement) return;

	const now = new Date();

	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	const day = String(now.getDate()).padStart(2, "0");
	const month = String(now.getMonth()).padStart(2, "0");
	const year = String(now.getFullYear()).padStart(2, "0");

	const dateTimeContent = `${hours}:${minutes}:${seconds} | ${day}/${month}/${year}`;

	dateTimeElement.textContent = dateTimeContent;
}

document.addEventListener("DOMContentLoaded", () => {
	setInterval(updateDateTime, 1000);
})

updateDateTime();

