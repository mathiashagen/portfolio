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
			"Mathias Hagen er utvikler med bakgrunn i C#/.NET og TypeScript, og bygger sanntidssystemer i C++ på fritiden.",
		name: "Mathias Hagen",
		tagline: "utvikler · C# · TypeScript · C++",
		intro:
			"Jeg jobber til daglig med C#/.NET og TypeScript, og bruker fritiden på å lære C++ ved å bygge ting som faktisk kjører, som en sanntids datapipeline for skipstrafikken langs norskekysten.",
		featured: "Utvalgt prosjekt",
		allProjects: "Alle prosjekter",
	},
	projects: {
		title: "Prosjekter",
		description: "Dette er en oversikt over mine prosjekter.",
		heading: "Mine prosjekter",
		repo: "Repo",
		demo: "Demo",
	},
	contact: {
		title: "Kontakt",
		description:
			"Ta kontakt med Mathias Hagen på e-post, LinkedIn eller GitHub.",
		heading: "Ta kontakt",
		intro:
			"Jeg svarer gjerne på spørsmål om prosjektene mine, jobb eller samarbeid. E-post er raskest, og CV sender jeg gjerne på forespørsel.",
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
			"Mathias Hagen is a developer with a background in C#/.NET and TypeScript who builds real-time systems in C++ outside work.",
		name: "Mathias Hagen",
		tagline: "developer · C# · TypeScript · C++",
		intro:
			"I work with C#/.NET and TypeScript day to day, and spend my spare time learning C++ by building things that actually run, like a real-time data pipeline for ship traffic along the Norwegian coast.",
		featured: "Featured project",
		allProjects: "All projects",
	},
	projects: {
		title: "Projects",
		description: "This is an overview of my projects.",
		heading: "My projects",
		repo: "Repo",
		demo: "Demo",
	},
	contact: {
		title: "Contact",
		description:
			"Get in touch with Mathias Hagen by email, LinkedIn or GitHub.",
		heading: "Get in touch",
		intro:
			"I'm happy to answer questions about my projects, work or collaboration. Email is the fastest way to reach me, and my CV is available on request.",
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
