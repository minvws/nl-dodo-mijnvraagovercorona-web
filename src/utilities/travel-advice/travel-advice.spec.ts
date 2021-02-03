import {
	coronaMelderCountry,
	countryCategory,
	travelStage,
} from './conditions';
import { RiskLevel } from 'config/countries';
import { evaluateAllConditionsToSingleBoolean } from './travel-advice';

describe('Travel advice', () => {
	it('Should combine all booleans into a single boolean (if one is false, the result should be false).', () => {
		/**
		 * This method is used in conjunction with the travel advice conditions.
		 * This test is merely give you a quick overview of how these condition functions
		 * would resolve into functions that return a boolean, which are then resolved
		 * to a single boolean value.
		 *
		 * The second object passed to this method are the different travel advice
		 * options (country, dates, travel restriction, etc). See the other tests for that.
		 */
		expect(
			evaluateAllConditionsToSingleBoolean([() => true, () => false], {}),
		).toEqual(false);

		expect(
			evaluateAllConditionsToSingleBoolean([() => true, () => true], {}),
		).toEqual(true);

		expect(
			evaluateAllConditionsToSingleBoolean([() => false, () => false], {}),
		).toEqual(false);

		expect(evaluateAllConditionsToSingleBoolean([], {})).toEqual(true);
	});

	it('Should the current advice options to every condition.', () => {
		const testCondition = jest.fn();

		const currentTravelAdviceOptions = {
			currentCategory: RiskLevel.D_EU_INREISVERBOD,
			fromDate: new Date('2021-02-01'),
			toDate: new Date('2021-02-04'),
			coronaMelderCountry: false,
		};

		evaluateAllConditionsToSingleBoolean(
			[testCondition],
			currentTravelAdviceOptions,
		);

		expect(testCondition).toHaveBeenCalledWith(currentTravelAdviceOptions);
	});

	it('Should evaluate the conditions to a single boolean', () => {
		// Advice options are passed as an empty object
		expect(
			evaluateAllConditionsToSingleBoolean(
				[
					travelStage(['voor-vertrek']),
					coronaMelderCountry(false),
					countryCategory([RiskLevel.D_EU_INREISVERBOD]),
				],
				{},
			),
		).toBe(false);

		// A condition that should resolve to true
		expect(
			evaluateAllConditionsToSingleBoolean(
				[
					travelStage(['voor-vertrek', 'tijdens-je-reis']),
					coronaMelderCountry(false),
					countryCategory([RiskLevel.D_EU_INREISVERBOD]),
				],
				{
					currentTravelStage: 'voor-vertrek',
					coronaMelderCountry: false,
					currentCategory: RiskLevel.D_EU_INREISVERBOD,
				},
			),
		).toBe(true);

		// A condition that doesn't apply to the currently selected options
		expect(
			evaluateAllConditionsToSingleBoolean(
				[
					travelStage(['voor-vertrek', 'tijdens-je-reis']),
					coronaMelderCountry(false),
					countryCategory([RiskLevel.D_EU_INREISVERBOD]),
				],
				{
					// Travel stage is different
					currentTravelStage: 'na-thuiskomst',
					coronaMelderCountry: false,
					currentCategory: RiskLevel.D_EU_INREISVERBOD,
				},
			),
		).toBe(false);
	});
});
