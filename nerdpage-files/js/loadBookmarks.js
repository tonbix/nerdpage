"use strict";

import { validateUrl } from "./validateUrl.js";

const categoryTpl = (name, bookmarks, color) => `
<div class="category" style="--accent-color: ${color}">
	<div class="category-label">> let <span>${name}</span> = </div>
	<div class="links">
		<span class="bracket">[</span>
		${bookmarks}
		<span class="bracket">]</span>
	</div>
</div>
`
const bookmarkTpl = (url, label) => `<a href="${url}">${label}</a>`


document.addEventListener("DOMContentLoaded", () => {
	const categoriesWrapper = document.getElementById("categories-wrapper");

	const bookmarks = JSON.parse(localStorage.getItem("nerdpage-bookmarks"));

	if (!bookmarks) {
		console.error("Error: no config.");
		const setupBookmarks = bookmarkTpl("", "add") + " " + bookmarkTpl("", "import");
		categoriesWrapper.innerHTML = categoryTpl("configure?", setupBookmarks, "hsl(160, 100%, 85%)");

		return;
	}

	const render = () => {
		const fullHtml = Object.entries(bookmarks).map(([categoryName, categoryData]) => {
			const bookmarksHtml = categoryData.bookmarks.map(bookmark => {
				const validUrl = validateUrl(bookmark.url);
				return validUrl ? bookmarkTpl(validUrl, bookmark.name) : "";
			}).join(" ");

			const accentColor = `hsl(${categoryData.hue}, 100%, 85%)`;

			return categoryTpl(categoryName, bookmarksHtml, accentColor);
		}).join(" ");

		categoriesWrapper.innerHTML = fullHtml;
	};

	render();
});
