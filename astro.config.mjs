// @ts-check

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

// The theme script is inlined with is:inline, which Astro does not hash, so
// hash the same file BaseLayout inlines.
const themeInitHash = createHash("sha256")
	.update(readFileSync("./src/scripts/theme-init.js", "utf8"))
	.digest("base64");

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
	// Hashes every inline script and style at build time and adds a CSP <meta>
	// tag to each page. nginx adds the directives a <meta> tag cannot carry.
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"img-src 'self'",
				"connect-src 'self'",
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'self'",
			],
			scriptDirective: {
				hashes: [`sha256-${themeInitHash}`],
			},
		},
	},
	// Shiki colours code blocks with inline styles, which CSP would block. The
	// site has no code blocks; switch to "prism" if it ever needs them.
	markdown: {
		syntaxHighlight: false,
	},
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
