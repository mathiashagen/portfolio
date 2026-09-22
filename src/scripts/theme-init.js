// Runs in <head> before the page is drawn, so a saved theme applies without a
// flash. Inlined by BaseLayout; astro.config.mjs hashes this exact file for
// the Content-Security-Policy, so the two can never disagree.
try {
	const theme = localStorage.getItem("theme");
	if (theme === "light" || theme === "dark") {
		document.documentElement.dataset.theme = theme;
	}
} catch {}
