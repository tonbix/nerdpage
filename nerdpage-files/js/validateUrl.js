"use strict";

const URL_REGEX = /^(?<protocol>https?:\/\/)?(?:(?<domain>(?<www>www\.)?(?<xld>(?:[0-9a-zA-Zа-яёА-ЯЁ-]{1,253}\.)+)(?<tld>[a-zA-Zа-яёА-ЯЁ-]{2,64}))|(?<ip>(?:\d{1,3}\.){3}\d{1,3})|(?<custom>(?:localhost|lh)))(?<port>:[0-9]{1,5})?(?<path>\/.*)?$/;


export const validateUrl = (rawUrl) => {
	const trimmedRawUrl = ( rawUrl || "" ).trim();
	if (!trimmedRawUrl) return null;

	const match = trimmedRawUrl.match(URL_REGEX);
	if (!match) return null;

	const groups = match.groups;

	const protocol = groups.protocol || "https://";

	let host = "";
	
	if (groups.domain) {
		host = groups.domain;
	} else if (groups.ip) {
		host = groups.ip;
	} else if (groups.custom) {
		host = groups.custom;
	}

	if (!host) return null;

	const port = groups.port || "";

	const path = groups.path || "/";

	const cleanUrl = protocol + host + port + path;

	return cleanUrl;
}

