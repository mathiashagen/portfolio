import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
	if (!site) {
		throw new Error(
			"robots.txt: `site` is not set in astro.config.mjs. It is needed to build the absolute Sitemap URL.",
		);
	}

	const body = [
		"User-agent: *",
		"Allow: /",
		`Sitemap: ${new URL("sitemap-index.xml", site)}`,
	].join("\n");

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
