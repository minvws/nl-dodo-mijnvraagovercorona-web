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
	beforeDate,
	afterDate,
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
	/* Bullets */
	bullets__tm_31maart_niet_reizen: [
		countryCategory(allCountriesExceptB),
		travelStage(['voor-vertrek']),
		// Month is April here, but JS Months are 0 based.
		beforeDate(new Date(2021, 3, 1)),
	],
	bullets__na_31maart_reizen_onzeker: [
		countryCategory(allCountriesExceptB),
		travelStage(['voor-vertrek']),
		// Month is March here, but JS Months are 0 based.
		afterDate(new Date(2021, 2, 31)),
	],
	bullets__na_reis_10dgn_thuisquarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['voor-vertrek']),
	],
	bullets__ga_10dgn_thuisquarantaine: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['tijdens-je-reis', 'na-thuiskomst']),
		maxDaysHome(10),
	],
	bullets__geen_thuisquarantaine: [
		countryCategory([RiskLevel.C_VEILIGE_LIJST]),
		maxDaysHome(10),
	],
	bullets__verhoogd_risico: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['tijdens-je-reis', 'na-thuiskomst']),
		maxDaysHome(10),
	],
	bullets__laag_risico: [
		countryCategory([RiskLevel.C_VEILIGE_LIJST]),
		travelStage(['tijdens-je-reis', 'na-thuiskomst']),
		maxDaysHome(10),
	],
	bullets__10dgn_verstreken: [countryCategory(allCountriesExceptB)],
	bullets__thuisquarantaine_voorbij: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
	],
	bullets__doe_de_check_opnieuw: [countryCategory(allCountriesExceptB)],
	bullets__klachten_dan_testen: [countryCategory(allCountriesExceptB)],

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
		meansOfTransport(['vliegtuig', 'anders']),
		maxDaysHome(10),
	],
	reisschema__gezondheidsverklaring: [
		countryCategory(allCountriesExceptB),
		meansOfTransport(['vliegtuig', 'anders']),
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
	banner__thuisquarantaine: [maxDaysHome(10)],
	agenda__reischeck_opnieuw_invullen: [
		travelStage(['voor-vertrek']),
		minDaysBeforeFromDate(7),
	],
	agenda__zet_thuisquarantaine_in_agenda: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		maxDaysHome(10),
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
	afspraak_coronatest__heb_je_klachten_na_5_dagen: [
		countryCategory([RiskLevel.A_RISICOVOL, RiskLevel.D_EU_INREISVERBOD]),
		travelStage(['na-thuiskomst']),
		minDaysHome(6),
	],
	afspraak_coronatest__heb_je_klachten_land_c: [
		countryCategory([RiskLevel.C_VEILIGE_LIJST]),
		travelStage(['na-thuiskomst']),
		maxDaysHome(10),
	],
};
