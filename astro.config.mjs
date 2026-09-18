// @ts-check
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
});
