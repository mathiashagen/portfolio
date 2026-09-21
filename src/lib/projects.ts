import { type CollectionEntry, getCollection } from "astro:content";

export const getProjectPaths = async (lang: string) => {
	const projects = await getCollection("projects", ({ id }) =>
		id.startsWith(`${lang}/`),
	);
	return projects.map((project) => ({
		params: { slug: getProjectSlug(project) },
		props: { project },
	}));
};

export const getProjectSlug = (project: CollectionEntry<"projects">) => {
	return project.id.slice(project.id.indexOf("/") + 1);
};
