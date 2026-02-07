"use strict";


const validateUrl = (url) => {
	if (!url || typeof url !== 'string') return null;
    
    const trimmed = url.trim();

    try {
        const parsed = new URL(trimmed);
        return parsed.href; 
    } catch (_) { }

    const domainRegex = /^[a-z0-9.-]+\.[a-z0-9]{2,}$/i;
    
    if (domainRegex.test(trimmed) && !trimmed.includes(' ')) {
        return `https://${trimmed}`;
    }

    return null;
}


document.addEventListener("DOMContentLoaded", () => {
	const categoriesWrapper = document.getElementById("categories-wrapper");

	if (typeof(BOOKMARKS) === "undefined") {
		console.error("Error: no config.");
		categoriesWrapper.innerHTML = "Error: no config.";
		return;
	}

	const render = () => {
		const fullHtml = Object.entries(BOOKMARKS).map(([categoryName, categoryData]) => {
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
