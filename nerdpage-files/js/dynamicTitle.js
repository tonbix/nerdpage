"use strict";

import settings from "../data/settings.json" with { type: "json" };

let dynamicTitleCounter = 0;


const updateTitle = () => {
	dynamicTitleCounter = (dynamicTitleCounter + 1) % settings.dynamicTitleFrames.length;

	document.title = settings.dynamicTitleFrames[dynamicTitleCounter];
}


document.addEventListener("DOMContentLoaded", () => {
	updateTitle();
	setInterval(updateTitle, 1000);
});

