import { SanityImageFullProps } from '../../sanity';

export interface CommonSiteSettings {
	baseUrl: string;
	pageTitleSuffix: string;
	socialShareImage: SanityImageFullProps;
	feedback: {
		button: string;
		content: string;
		thanks: string;
		title: string;
		url: string;
	};
	ctaBlock: {
		title: string;
		content: string;
		label: string;
		url: string;
	};
	footer: {
		alleenSamenAlt: string;
		items: {
			url: string;
			content: string;
		}[];
		meerInformatieTitle: string;
		rijksoverheidText: string;
		rijksoverheidUrl: string;
		title: string;
		footerText: Object[];
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
	quarantaineCalendar: {
		dateSeperator: string;
		otherCalendar: string;
		title: string;
		modalTitle: string;
		modalBody: string;
		inviteTitle: string;
		inviteText: string;
	};
	checkAgainCalendar: {
		modalTitle: string;
		modalBody: string;
		inviteTitle: string;
		inviteText: string;
	};
	printCta: string;
	checkAgainCta: string;
	agendaCta: string;
	dagen: string[];
	datumKiesTekst: string;
	maanden: string[];
	updatedAt: string;
	situationPlural: {
		this: string;
		that: string;
	};
	seeMoreExpand: {
		this: string;
		that: string;
	};
	severeSymptomsAdvice: {
		title: string;
		subtitle: string;
		icon: SanityImageFullProps;
	};
	accessibility: {
		labelExternalLink: string;
	};
}
