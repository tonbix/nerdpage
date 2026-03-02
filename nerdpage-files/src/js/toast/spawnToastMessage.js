"use strict";

const toastTpl = (color, content) => `<p style="--accent-color: hsl(${color} 100 75)"}>${content}</p>`;

const spawnToastMessage = (color, content) => {
	const toastWrapper = document.getElementById("toasts-wrapper");

	toastWrapper.insertAdjacentHTML('beforeend', toastTpl(color, content));
	const toast = toastWrapper.lastElementChild;

	setTimeout(() => {
		if (toast) toast.remove();
	}, 5000);
};

spawnToastMessage(240, "testtest");

