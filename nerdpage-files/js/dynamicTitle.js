"use strict";

let dynamicTitleCounter = 0;


const updateTitle = () => {
	dynamicTitleCounter = (dynamicTitleCounter + 1) % DYNAMIC_TITLE_FRAMES.length;

	document.title = DYNAMIC_TITLE_FRAMES[dynamicTitleCounter];
}


document.addEventListener("DOMContentLoaded", () => {
	updateTitle();
	setInterval(updateTitle, 1000);
});

