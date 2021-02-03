import { RiskLevel } from 'config/countries';
import {
	afterDate,
	beforeDate,
	coronaMelderCountry,
	countryCategory,
	maxDaysHome,
	meansOfTransport,
	minDaysBeforeFromDate,
	minDaysHome,
	travelRestriction,
	travelStage,
} from './conditions';

describe('Travel advice conditions', () => {
	beforeAll(() => {
		jest
			.useFakeTimers('modern')
			.setSystemTime(new Date('2021-02-01').getTime());
	});

	it('Should match coutry categories', () => {
		const condition = countryCategory([
			RiskLevel.D_EU_INREISVERBOD,
			RiskLevel.A_RISICOVOL,
		]);

		// True if in condition.
		expect(condition({ currentCategory: RiskLevel.D_EU_INREISVERBOD })).toBe(
			true,
		);
		expect(condition({ currentCategory: RiskLevel.A_RISICOVOL })).toBe(true);

		// If not in condition or undefined -> false.
		expect(
			condition({ currentCategory: RiskLevel.B_RISICOVOL_INREISBEPERKINGEN }),
		).toBe(false);
		expect(condition({ currentCategory: undefined })).toBe(false);

		// If no options are passed to conditions -> false
		const emptyCondition = countryCategory([]);
		expect(emptyCondition({ currentCategory: RiskLevel.A_RISICOVOL })).toBe(
			false,
		);
	});

	it('Should match means of transport', () => {
		const condition = meansOfTransport(['vliegtuig', 'auto']);

		// True if in condition.
		expect(condition({ currentMeansOfTransport: 'vliegtuig' })).toBe(true);
		expect(condition({ currentMeansOfTransport: 'auto' })).toBe(true);

		// If not in condition or undefined -> false.
		expect(
			condition({
				currentMeansOfTransport: 'anders',
			}),
		).toBe(false);
		expect(condition({ currentMeansOfTransport: undefined })).toBe(false);

		// If no options are passed to conditions -> false
		const emptyCondition = countryCategory([]);
		expect(emptyCondition({ currentMeansOfTransport: 'vliegtuig' })).toBe(
			false,
		);
	});

	it('Should match travel stage', () => {
		const condition = travelStage(['tijdens-je-reis', 'na-thuiskomst']);

		// True if in condition.
		expect(condition({ currentTravelStage: 'tijdens-je-reis' })).toBe(true);
		expect(condition({ currentTravelStage: 'na-thuiskomst' })).toBe(true);

		// If not in condition or undefined -> false.
		expect(
			condition({
				currentTravelStage: 'voor-vertrek',
			}),
		).toBe(false);
		expect(condition({ currentTravelStage: undefined })).toBe(false);

		// If no options are passed to conditions -> false
		const emptyCondition = countryCategory([]);
		expect(emptyCondition({ currentTravelStage: 'voor-vertrek' })).toBe(false);
	});

	it('Should count the minimal days home', () => {
		// Current system date is set at '2021-02-01' in beforeAll().
		const condition = minDaysHome(3);

		// Less than 3 days at home
		expect(condition({ toDate: new Date('2021-01-31') })).toBe(false);
		// A date in the future
		expect(condition({ toDate: new Date('2021-02-12') })).toBe(false);
		// The toDate counts as day one. Therefore if you arrived 2 days
		// before 2021-02-01 it will be day 3.
		// Exactly 3 days at home
		expect(condition({ toDate: new Date('2021-01-30') })).toBe(true);
		// Waaaay back.
		expect(condition({ toDate: new Date('2021-01-18') })).toBe(true);
		// An invalid date
		expect(condition({ toDate: new Date('2021asdasd') })).toBe(false);
		expect(condition({ toDate: undefined })).toBe(false);
	});

	it('Should count the max days home', () => {
		// Current system date is set at '2021-02-01' in beforeAll().
		const condition = maxDaysHome(5);

		// More than 5 days at home
		expect(condition({ toDate: new Date('2021-01-20') })).toBe(false);
		// A date in the future
		expect(condition({ toDate: new Date('2021-02-12') })).toBe(true);
		// The toDate counts as day one. Therefore if you arrived 2 days
		// after 2021-02-01 it will be day 3.
		// Exactly 5 days at home
		expect(condition({ toDate: new Date('2021-01-28') })).toBe(true);
		// Waaaay in the future (You haven't arrived home, so you are less than 5 days at home).
		expect(condition({ toDate: new Date('2021-02-18') })).toBe(true);
		// An invalid date
		expect(condition({ toDate: new Date('2021asdasd') })).toBe(false);
		expect(condition({ toDate: undefined })).toBe(false);
	});

	it('Should count the minimum number of days before deperature', () => {
		// Current system date is set at '2021-02-01' in beforeAll().
		const condition = minDaysBeforeFromDate(8);

		// More than 5 days before departure
		expect(condition({ fromDate: new Date('2021-01-20') })).toBe(false);
		// A date in the future (after departure is also 8 days BEFORE from date).
		// If you want to restrict this, combine it with another condition.
		expect(condition({ fromDate: new Date('2021-02-12') })).toBe(true);
		// The fromDate counts as day one. Therefore if today is 2 days before
		// the fromDate, this counts as day 3.
		// Exactly 8 days before departure
		expect(condition({ fromDate: new Date('2021-02-09') })).toBe(true);
		// Departure date waaaay in the future.
		expect(condition({ fromDate: new Date('2021-02-18') })).toBe(true);
		// An invalid date
		expect(condition({ fromDate: new Date('2021asdasd') })).toBe(false);
		expect(condition({ fromDate: undefined })).toBe(false);
	});

	it('Should validate the coronaMelder boolean', () => {
		const condition = coronaMelderCountry(true);
		const conditionFalse = coronaMelderCountry(false);

		// True checks.
		expect(condition({ coronaMelderCountry: true })).toBe(true);
		expect(condition({ coronaMelderCountry: false })).toBe(false);
		expect(condition({ coronaMelderCountry: undefined })).toBe(false);

		// False checks
		expect(conditionFalse({ coronaMelderCountry: true })).toBe(false);
		expect(conditionFalse({ coronaMelderCountry: false })).toBe(true);
		expect(conditionFalse({ coronaMelderCountry: undefined })).toBe(false);
	});

	it('Should validate applicable travel restrictions', () => {
		const condition = travelRestriction(['vliegtuig']);

		expect(condition({ transportRestrictions: ['vliegtuig'] })).toBe(true);
		expect(condition({ transportRestrictions: ['ferry'] })).toBe(false);
		expect(condition({ transportRestrictions: ['vliegtuig', 'ferry'] })).toBe(
			true,
		);
	});

	it('Should validate if departure date is before given date', () => {
		const condition = beforeDate(new Date('2021-02-20'));

		// Before
		expect(condition({ fromDate: new Date('2021-02-01') })).toBe(true);
		// After
		expect(condition({ fromDate: new Date('2021-02-25') })).toBe(false);
		// On same date
		expect(condition({ fromDate: new Date('2021-02-20') })).toBe(false);
		// Invalid date
		expect(condition({ fromDate: new Date('2021asdfasdf') })).toBe(false);
		expect(condition({ fromDate: undefined })).toBe(false);
	});

	it('Should validate if departure date is after given date', () => {
		const condition = afterDate(new Date('2021-02-20'));

		// Before
		expect(condition({ fromDate: new Date('2021-02-01') })).toBe(false);
		// After
		expect(condition({ fromDate: new Date('2021-02-25') })).toBe(true);
		// On same date
		expect(condition({ fromDate: new Date('2021-02-20') })).toBe(false);
		// Invalid date
		expect(condition({ fromDate: new Date('2021asdfasdf') })).toBe(false);
		expect(condition({ fromDate: undefined })).toBe(false);
	});
});
