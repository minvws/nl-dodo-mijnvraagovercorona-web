import { RiskLevel } from './countries';
import { MeansOfTransport } from '../components/advice/AdviceContext';
import {
	countryCategory,
	travelStage,
	meansOfTransport,
	coronaMelderCountry,
	maxDaysHome,
	travelRestriction,
	minDaysBeforeFromDate,
	minDaysHome,
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
		maxDaysHome(10),
	],
	reisschema__pcrtest: [
		countryCategory([RiskLevel.A_RISICOVOL]),
		meansOfTransport(allMeansOfTransportExceptCar),
		maxDaysHome(10),
	],
	reisschame__pcrtest_en_verklaring: [
		countryCategory([RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(allMeansOfTransportExceptCar),
		maxDaysHome(10),
	],
	reisschema__sneltest: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		meansOfTransport(['vliegtuig']),
		maxDaysHome(10),
	],
	reisschema__gezondheidsverklaring: [
		countryCategory(allCountriesExceptB),
		meansOfTransport(['vliegtuig']),
		maxDaysHome(10),
	],
	reisschema__thuisquarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		maxDaysHome(10),
	],
	// Other widgets
	banner__airtravel_restriction: [travelRestriction(['vliegtuig'])],
	banner__airboattravel_restriction: [
		travelRestriction(['vliegtuig', 'ferry']),
	],
	agenda__reischeck_opnieuw_invullen: [
		travelStage(['voor-vertrek']),
		minDaysBeforeFromDate(7),
	],
	agenda__afspraak_coronatest: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['voor-vertrek', 'tijdens-je-reis']),
	],
	afspraak_coronatest__nog_niet_mogelijk: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['voor-vertrek', 'tijdens-je-reis']),
	],
	afspraak_coronatest__niet_online_wel_telefonisch: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['na-thuiskomst']),
		maxDaysHome(3),
	],
	afspraak_coronatest__online_en_telefonisch: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['na-thuiskomst']),
		minDaysHome(4),
		maxDaysHome(5),
	],
	afspraak_coronatest__heb_je_klachten_after_5_days: [
		countryCategory(allCountriesExceptB),
		travelStage(['na-thuiskomst']),
		minDaysHome(6),
	],
};
