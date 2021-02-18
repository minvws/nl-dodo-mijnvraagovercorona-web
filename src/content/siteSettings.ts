export interface SiteSettings {
	pageTitleSuffix: string;
	feedback: {
		button: string;
		content: string;
		title: string;
		url: string;
	};
	footer: {
		alleenSamenAlt: string;
		items: string[];
		meerInformatieTitle: string;
		rijksoverheidText: string;
		rijksoverheidUrl: string;
		title: string;
	};
	header: {
		logoAlt: string;
		opnieuw: string;
		terug: string;
	};
	privacy: {
		title: string;
		beloftes: string[];
	};
	vervoersmiddelen: {
		naam: 'vliegtuig' | 'auto' | 'trein' | 'bus' | 'anders';
		uitgebreid: string;
	}[];
}
