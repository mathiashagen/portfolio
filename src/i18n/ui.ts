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
};

const ui = { nb, en };

const getUi = (locale: string | undefined) => ui[getLang(locale)];

const getLang = (locale: string | undefined) => {
	if (locale !== undefined && Object.hasOwn(ui, locale)) {
		return locale as keyof typeof ui;
	}
	return "nb" as keyof typeof ui;
};

export { getLang, getUi };
