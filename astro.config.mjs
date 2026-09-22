// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: "nb",
		locales: ["nb", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
	},

	trailingSlash: "always",
	site: "https://mathiashagen.dev",
	integrations: [
		sitemap({
			i18n: { defaultLocale: "nb", locales: { nb: "nb-NO", en: "en-US" } },
		}),
	],
});
