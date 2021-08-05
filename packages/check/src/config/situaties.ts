export interface Situation {
	maxDays: number;
	showDate: boolean;
	showProtected: boolean;
	url: string;
}

export type Situaties =
	| 'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten'
	| 'ik-kan-afstand-houden'
	| 'ik-ben-misschien-besmet'
	| 'ik-heb-een-coronamelder-melding-gekregen'
	| 'ik-kom-uit-een-risicogebied'
	| 'ik-heb-corona-met-klachten'
	| 'ik-heb-corona-zonder-klachten'
	| 'ik-heb-1-of-meer-coronaklachten'
	| 'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-klachten'
	| 'iemand-in-huis-heeft-zware-klachten';

const situationToSanityPageMapping: { [key in Situaties]: string } = {
	'ik-heb-1-of-meer-coronaklachten': 'situatie-zelf-klachten-page',
	'ik-ben-misschien-besmet': 'situatie-buurt-page',
	'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-klachten':
		'situatie-huisgenoot-corona-geen-afstand-wel-klachten-page',
	'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten':
		'situatie-huisgenoot-corona-geen-afstand-geen-klachten-page',
	'ik-kan-afstand-houden': 'situatie-huisgenoot-corona-wel-afstand-page',
	'iemand-in-huis-heeft-zware-klachten':
		'situatie-huisgenoot-met-klachten-page',
	'ik-heb-een-coronamelder-melding-gekregen': 'situatie-coronamelder-page',
	'ik-kom-uit-een-risicogebied': 'situatie-reis-page',
	'ik-heb-corona-met-klachten': 'situatie-corona-met-klachten-page',
	'ik-heb-corona-zonder-klachten': 'situatie-corona-zonder-klachten-page',
};

export const getSanityPageIdBySituation = (situation: Situaties) =>
	situationToSanityPageMapping[situation];
