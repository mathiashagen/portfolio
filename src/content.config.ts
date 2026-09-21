import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const projects = defineCollection({
	loader: glob({
		base: "./src/content/projects",
		pattern: "**/*.md",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			tech: z.array(z.string()),
			repo: z.url().optional(),
			demo: z.url().optional(),
			date: z.coerce.date(),
			cover: image(),
			coverAlt: z.string().min(1),
		}),
});

export const collections = {
	projects,
};
