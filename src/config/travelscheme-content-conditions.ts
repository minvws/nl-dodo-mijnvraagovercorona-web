import { RiskLevel } from './countries';
import {
	MeansOfTransport,
	TravelStage,
} from '../components/advice/AdviceContext';
import {
	countryCategory,
	travelStage,
	meansOfTransport,
	coronaMelderCountry,
	maxDaysAfterToDate,
	hasTransportRestriction,
	maxDaysBeforeFromDate,
} from 'utilities/travel-advice/conditions';

/**
 * A few quick configuration arrays you can use to prevent a
 * lot of unneccesary duplication.
 */
const allCountriesExceptB: RiskLevel[] = [
	RiskLevel.A_RISICOVOL,
	RiskLevel.C_VEILIGE_LIJST,
	RiskLevel.D_EU_INREISVERBOD,
];

const allMeansOfTransportExceptCar: MeansOfTransport[] = [
	'vliegtuig',
	'trein',
	'bus',
	'anders',
];

/**
 * This configuration object holds properties for each different content
 * block on the travel advice page.
 *
 * Each property has an array of conditions that ALL need to evaluate to true.
 * Each function returns a new function that will accept the GetTravelSchemeContentBlocksParams
 * type as parameters and use this to return 1 single boolean.
 * Next all these booleans are combined, resulting in 1 boolean per property of
 * the object.
 *
 * In order to evaluate and combine these booleans, this object
 * should not be used directly, but is consumed via getTravelSchemeContentBlocks()
 */
export const travelAdviceConfiguration = {
	/* Travel Scheme */
	reisschema__downloadReisApp: [
		countryCategory(allCountriesExceptB),
		travelStage(['voor-vertrek']),
	],
	reisschema__coronaMelder: [
		travelStage(['voor-vertrek']),
		coronaMelderCountry(true),
	],
	reisschema__voorbereidenThuisQuarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['voor-vertrek']),
	],
	reisschema__reisadvies: [
		countryCategory(allCountriesExceptB),
		maxDaysAfterToDate(10),
	],
	reisschema__pcrtest: [
		countryCategory([RiskLevel.A_RISICOVOL]),
		meansOfTransport(allMeansOfTransportExceptCar),
		maxDaysAfterToDate(10),
	],
	reisschame__pcrtest_en_verklaring: [
		countryCategory([RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(allMeansOfTransportExceptCar),
		maxDaysAfterToDate(10),
	],
	reisschema__sneltest: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(['vliegtuig']),
		maxDaysAfterToDate(10),
	],
	reisschema__gezondheidsverklaring: [
		countryCategory(allCountriesExceptB),
		meansOfTransport(['vliegtuig']),
		maxDaysAfterToDate(10),
	],
	reisschema__thuisquarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		maxDaysAfterToDate(10),
	],

	/* Banners */
	banner__vliegtuigVerbod: [hasTransportRestriction(['vliegtuig'])],

	banner__vliegtuigEnFerryVerbod: [
		hasTransportRestriction(['vliegtuig', 'ferry']),
	],

	/* Agenda */
	agenda__reischeckOpnieuwInvullen: [
		travelStage(['voor-vertrek']),
		maxDaysBeforeFromDate(7),
	],
	agenda__thuisQuarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		maxDaysAfterToDate(10),
	],

	/* GGD sectie */
	ggd__afspraakMakenNietMogelijk: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['tijdens-je-reis']),
	],
	ggd__afspraakMakenAlleenTelefonisch: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['na-thuiskomst']),
		maxDaysAfterToDate(4),
	],
	ggd__alleOpties: [],
};
