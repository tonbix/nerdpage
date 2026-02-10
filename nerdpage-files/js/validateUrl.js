"use strict";

const URL_REGEX = none;


const validateUrl = (rawUrl) => {
	trimmedRawUrl = ( rawUrl || "" ).trim();
	if (!trimmedRawUrl) return null;

	const match = trimmedRawUrl.match(URL_REGEX);
	if (!match) return null;
}

