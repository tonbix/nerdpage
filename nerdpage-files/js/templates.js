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

