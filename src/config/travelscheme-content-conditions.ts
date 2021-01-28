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

const allMeansOfTransport: MeansOfTransport[] = [
	'vliegtuig',
	'auto',
	'trein',
	'bus',
	'ferry',
	'anders',
];

const allMeansOfTransportExceptCar: MeansOfTransport[] = [
	'vliegtuig',
	'trein',
	'bus',
	'ferry',
	'anders',
];

const allTravelStages: TravelStage[] = [
	'voor-vertrek',
	'tijdens-je-reis',
	'na-thuiskomst',
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
	// Travel Scheme
	reisschema__downloadReisApp: [
		countryCategory(allCountriesExceptB),
		meansOfTransport(allMeansOfTransport),
		travelStage(['voor-vertrek']),
	],
	reisschema__coronaMelder: [
		meansOfTransport(allMeansOfTransport),
		travelStage(['voor-vertrek']),
		coronaMelderCountry(true),
	],
	reisschema__voorbereidenThuisQuarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(allMeansOfTransport),
		travelStage(['voor-vertrek']),
	],
	reisschema__reisadvies: [
		countryCategory(allCountriesExceptB),
		meansOfTransport(allMeansOfTransport),
		travelStage(allTravelStages),
		maxDaysAfterToDate(10),
	],
	reisschema__pcrtest: [
		countryCategory([RiskLevel.A_RISICOVOL]),
		meansOfTransport(allMeansOfTransportExceptCar),
		travelStage(allTravelStages),
		maxDaysAfterToDate(10),
	],
	reisschame__pcrtest_en_verklaring: [
		countryCategory([RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(allMeansOfTransportExceptCar),
		travelStage(allTravelStages),
		maxDaysAfterToDate(10),
	],
	reisschema__sneltest: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(['vliegtuig', 'ferry']),
		travelStage(allTravelStages),
		maxDaysAfterToDate(10),
	],
	reisschema__gezondheidsverklaring: [
		countryCategory(allCountriesExceptB),
		meansOfTransport(['vliegtuig']),
		travelStage(allTravelStages),
		maxDaysAfterToDate(10),
	],
	reisschema__thuisquarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(allMeansOfTransport),
		travelStage(allTravelStages),
		maxDaysAfterToDate(10),
	],
	//
};
