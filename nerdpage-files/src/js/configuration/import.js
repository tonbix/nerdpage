"use strict";

import { spawnToastMessage } from "../toast/spawnToastMessage.js";

const exportButtonElement = document.getElementById("export-configuration-button");
const overlayElement = document.getElementById("overlay-copy-configuration");
const overlayTextareaElement = document.getElementById("overlay-copy-configuration-textarea");
const overlayCloseButtonElement = document.getElementById("overlay-copy-configuration-close-button");

exportButtonElement.addEventListener("click", () => {
	try {
		const oldBookmarksJson = JSON.stringify(JSON.parse(localStorage.getItem("nerdpage-bookmarks")), null, 4);
		const newBookmarksJson = JSON.stringify(JSON.parse(navigator.clipboard.readText()));

		overlayElement.classList.remove("disabled");
	} catch (e) {
		console.error(e);
	}
});

overlayCloseButtonElement.addEventListener("click", () => {
	overlayElement.classList.add("disabled");
});

