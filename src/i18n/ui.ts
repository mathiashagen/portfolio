import { getRelativeLocaleUrl } from "astro:i18n";

const nb = {
	nav: {
		home: "Hjem",
		about: "Om",
		projects: "Prosjekter",
		contact: "Kontakt",
	},
	home: {
		title: "Hjem",
		description:
			"Mathias Hagen er fullstack-utvikler i Ålesund. Han jobber med C#/.NET og TypeScript til daglig og lærer C++ på fritiden.",
		name: "Mathias Hagen",
		tagline: "fullstack · C# · TypeScript · C++",
		intro:
			"Jeg jobber med C#/.NET og TypeScript til daglig. På fritiden lærer jeg C++, og det største prosjektet så langt er en datapipeline som følger skipstrafikken langs norskekysten i sanntid.",
		featured: "Utvalgt prosjekt",
		allProjects: "Alle prosjekter",
	},
	projects: {
		title: "Prosjekter",
		description:
			"Prosjekter Mathias Hagen har laget på fritiden, med kildekode og demo.",
		heading: "Ting jeg har laget",
		repo: "Repo",
		demo: "Demo",
	},
	contact: {
		title: "Kontakt",
		description:
			"Ta kontakt med Mathias Hagen på e-post, LinkedIn eller GitHub.",
		heading: "Ta kontakt",
		intro:
			"Send meg gjerne en e-post hvis du lurer på noe om prosjektene, jobb eller noe annet. Der svarer jeg raskest, og CV får du hvis du spør.",
		email: "e-post",
		linkedin: "linkedin",
		github: "github",
	},
	theme: { toggle: "Mørk modus" },
	meta: {
		ogLocale: "nb_NO",
		languageName: "Norsk",
		ogImageAlt:
			"Mathias Hagen, fullstack-utvikler i Ålesund, i terminalstil på mørk bakgrunn.",
	},
};

const en: typeof nb = {
	nav: {
		home: "Home",
		about: "About",
		projects: "Projects",
		contact: "Contact",
	},
	home: {
		title: "Home",
		description:
			"Mathias Hagen is a fullstack developer in Ålesund, Norway. He works with C#/.NET and TypeScript and is learning C++ in his spare time.",
		name: "Mathias Hagen",
		tagline: "fullstack · C# · TypeScript · C++",
		intro:
			"I work with C#/.NET and TypeScript during the day. In my spare time I'm learning C++, and the biggest project so far is a pipeline that tracks ship traffic along the Norwegian coast in real time.",
		featured: "Featured project",
		allProjects: "All projects",
	},
	projects: {
		title: "Projects",
		description: "Side projects by Mathias Hagen, with source code and demos.",
		heading: "Things I've built",
		repo: "Repo",
		demo: "Demo",
	},
	contact: {
		title: "Contact",
		description:
			"Get in touch with Mathias Hagen by email, LinkedIn or GitHub.",
		heading: "Get in touch",
		intro:
			"Feel free to email me if you have questions about the projects, work or anything else. That's where I answer fastest, and I'll send my CV if you ask.",
		email: "email",
		linkedin: "linkedin",
		github: "github",
	},
	theme: { toggle: "Dark mode" },
	meta: {
		ogLocale: "en_US",
		languageName: "English",
		ogImageAlt:
			"Mathias Hagen, fullstack developer in Ålesund, in terminal style on a dark background.",
	},
};

const ui = { nb, en };

export const getUi = (locale: string | undefined) => ui[getLang(locale)];

export const defaultLang = "nb";

export const getLang = (locale: string | undefined): keyof typeof ui => {
	if (locale !== undefined && Object.hasOwn(ui, locale)) {
		return locale as keyof typeof ui;
	}
	return defaultLang;
};

export const getAlternateUrl = (pathname: string, lang: string) => {
	const prefix = `/${lang}`;
	const path = pathname.startsWith(`${prefix}/`)
		? pathname.slice(prefix.length)
		: pathname;
	const otherLang = lang === defaultLang ? "en" : defaultLang;
	return { lang: otherLang, href: getRelativeLocaleUrl(otherLang, path) };
};
