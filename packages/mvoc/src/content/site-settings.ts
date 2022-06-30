import { CommonSiteSettings } from '@quarantaine/common';

export interface SiteSettings extends CommonSiteSettings {
	quarantaineGids: {
		title: string;
		button: string;
		text: string;
		url: string;
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
	GGDSpecialInstructions: string;
	quarantineOverviewTitle: string;
	printCta: string;
	favoriteCta: string;
}
