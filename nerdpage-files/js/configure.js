"use strict";

import settings from "../data/settings.json" with { type: "json" };


document.addEventListener("DOMContentLoaded", () => {
	const configureButtonElement = document.getElementById("configure-button");
	const configureOverlayElement = document.getElementById("configure-overlay");
	const configureInputElement = document.getElementById("configure-input");

	const closeOverlay = (overlayEl, inputEl) => {
		overlayEl.classList.add("hidden");
		inputEl.value = "";
	}

	if (configureButtonElement) {
		configureButtonElement.addEventListener("click", () => {
			configureOverlayElement.classList.remove("hidden");
			setTimeout(() => {
				configureInputElement.focus();
			}, 0);
		});
	}

	if (configureInputElement) {
		configureInputElement.addEventListener("blur", () => {
			if (!configureOverlayElement.classList.contains("hidden")) {
				closeOverlay(configureOverlayElement, configureInputElement);
			}
		});

		configureInputElement.addEventListener("keydown", (e) => {
			if (e.key == "Enter") {
				e.preventDefault();
				// pick first match
			}
		});
	}

	if (configureOverlayElement) {
		configureOverlayElement.addEventListener("click", (e) => {
			if (e.target === e.currentTarget) {
				closeOverlay(configureOverlayElement, configureInputElement);
			}
		});
	}
});

