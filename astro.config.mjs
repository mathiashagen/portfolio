// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

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
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 700],
			subsets: ["latin"],
			styles: ["normal"],
			fallbacks: ["monospace"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Inter",
			cssVariable: "--font-sans",
			weights: [400, 600],
			subsets: ["latin"],
			styles: ["normal"],
		},
	],
});
