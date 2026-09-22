const nb = {
	nav: {
		home: "Hjem",
		about: "Om",
		projects: "Prosjekter",
		contact: "Kontakt",
	},
	home: {
		title: "Velkommen",
		description: "Dette er min portefølje.",
		heading: "Velkommen til min portefølje",
	},
	about: {
		title: "Om",
		description: "Dette er litt informasjon om meg.",
		heading: "Om meg",
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
		description: "Dette er hvordan du kan kontakte meg.",
		heading: "Kontakt meg",
	},
	theme: { toggle: "Mørk modus" },
	meta: { ogLocale: "nb_NO" },
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
		description: "This is my portfolio.",
		heading: "Welcome to my portfolio",
	},
	about: {
		title: "About",
		description: "This is some information about me.",
		heading: "About me",
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
		description: "This is how you can contact me.",
		heading: "Contact me",
	},
	theme: { toggle: "Dark mode" },
	meta: { ogLocale: "en_US" },
};

const ui = { nb, en };

const getUi = (locale: string | undefined) => ui[getLang(locale)];

const getLang = (locale: string | undefined): keyof typeof ui => {
	if (locale !== undefined && Object.hasOwn(ui, locale)) {
		return locale as keyof typeof ui;
	}
	return "nb";
};

export { getLang, getUi };
