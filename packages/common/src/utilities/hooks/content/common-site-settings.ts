export interface CommonSiteSettings {
	baseUrl: string;
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
		resultaat: string;
	};
	privacy: {
		id: string;
		usp: string;
		title: string;
		beloftes: string[];
	};
}
