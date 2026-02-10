"use strict";

import settings from "../data/settings.json" with { type: "json" };

const closeOverlay = (overlayEl, inputEl) => {
	overlayEl.classList.add("hidden");
	inputEl.value = "";
}


document.addEventListener("DOMContentLoaded", () => {
	const searchButtonElement = document.getElementById("search-button");
	const searchOverlayElement = document.getElementById("search-overlay");
	const searchInputElement = document.getElementById("search-input");

	if (searchButtonElement) {
		searchButtonElement.addEventListener("click", () => {
			searchOverlayElement.classList.remove("hidden");
			setTimeout(() => {
				searchInputElement.focus();
			}, 0);
		});
	}


	if (searchInputElement) {
		searchInputElement.addEventListener("blur", () => {
			if (!searchOverlayElement.classList.contains("hidden")) {
				closeOverlay(searchOverlayElement, searchInputElement);
			}
		});

		searchInputElement.addEventListener("keydown", (e) => {
			if (e.key == "Enter") {
				e.preventDefault();

				const searchUrl = settings.searchEngine + searchInputElement.value;

				window.location.replace(searchUrl);
			}
		});
	}



	if (searchOverlayElement) {
		searchOverlayElement.addEventListener("click", (e) => {
			if (e.target === e.currentTarget) {
				closeOverlay(searchOverlayElement, searchInputElement);
			}
		});
	}
});

