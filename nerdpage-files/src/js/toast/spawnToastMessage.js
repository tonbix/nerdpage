"use strict";

const toastTpl = (color, content) => `<p style="--accent-color: hsl(${color} 100 75)"}>${content}</p>`;

export const spawnToastMessage = (color, content, removeTimeoutSeconds = 5) => {
	const toastWrapper = document.getElementById("toasts-wrapper");

	toastWrapper.insertAdjacentHTML('beforeend', toastTpl(color, content));
	const toast = toastWrapper.lastElementChild;

	toast.addEventListener("click", () => {
		if (toast) toast.remove();
	});

	if ( removeTimeoutSeconds != 0 ) {
		setTimeout(() => {
			if (toast) toast.remove();
		}, removeTimeoutSeconds * 1000);
	}
};

