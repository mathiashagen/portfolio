import { type CollectionEntry, getCollection } from "astro:content";

export const getProjectPaths = async (lang: string) => {
	const projects = await getProjects(lang);
	return projects.map((project) => ({
		params: { slug: getProjectSlug(project) },
		props: { project },
	}));
};

export const getProjectSlug = (project: CollectionEntry<"projects">) => {
	return project.id.slice(project.id.indexOf("/") + 1);
};

export const getProjects = async (lang: string) => {
	return (
		await getCollection("projects", ({ id }) => id.startsWith(`${lang}/`))
	).toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

export const getNewestProject = async (lang: string) => {
	return (await getProjects(lang)).at(0);
};
