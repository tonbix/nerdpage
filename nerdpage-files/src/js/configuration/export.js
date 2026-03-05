"use strict";

import { spawnToastMessage } from "../toast/spawnToastMessage.js";

const exportButtonElement = document.getElementById("export-configuration-button");
const overlayElement = document.getElementById("overlay-copy-configuration");
const overlayTextareaElement = document.getElementById("overlay-copy-configuration-textarea");
const overlayCloseButtonElement = document.getElementById("overlay-copy-configuration-close-button");

exportButtonElement.addEventListener("click", () => {
	const bookmarksJson = JSON.stringify(JSON.parse(localStorage.getItem("nerdpage-bookmarks")), null, 4);

	try {
		navigator.clipboard.writeText(bookmarksJson);
		spawnToastMessage("100", "copied configuration to clipboard");
	} catch (e) {
		console.error(e);

		overlayElement.classList.remove("disabled");

		overlayTextareaElement.value = bookmarksJson;
		overlayTextareaElement.select();
	}
});

overlayCloseButtonElement.addEventListener("click", () => {
	overlayElement.classList.add("disabled");
});

