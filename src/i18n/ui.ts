const nb = {
	nav: {
		home: "Hjem",
		about: "Om",
		projects: "Prosjekter",
		contact: "Kontakt",
	},
};

const en: typeof nb = {
	nav: {
		home: "Home",
		about: "About",
		projects: "Projects",
		contact: "Contact",
	},
};

const ui = { nb, en };

const getUi = (locale: string | undefined = "nb") => {
	if (Object.hasOwn(ui, locale)) {
		return ui[locale as keyof typeof ui];
	}
	return ui.nb;
};

export default getUi;
