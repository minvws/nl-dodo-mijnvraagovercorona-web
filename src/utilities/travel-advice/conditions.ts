/**
 * @TODO: I still think these type names can be improved.
 * Suggestions welcome :)
 */

import { MeansOfTransport, TravelStage } from 'components/advice/AdviceContext';
import { RiskLevel, TransportRestrictions } from 'config/countries';
import { GetTravelSchemeContentBlocksParams } from './travel-advice';
import { differenceInDays, isAfter, isBefore } from 'date-fns';
import { addDays } from 'utilities/dateUtils';

export type ShowBlockFunction<InputType extends unknown> = (
	options: InputType,
) => EvaluateBooleanMethod;

export type EvaluateBooleanMethod = (
	config: GetTravelSchemeContentBlocksParams,
) => boolean;

/**
 * Function that accepts an array of RiskLevel, and ensures
 * that the level for the current country is present in this array.
 */
export const countryCategory: ShowBlockFunction<RiskLevel[]> = (
	anyOfTheseCategories,
) => ({ currentCategory }) =>
	anyOfTheseCategories.some((category) => category === currentCategory);

/**
 * Function that accepts an array of transport methods, and ensures that
 * the currently selected transport method is present in this array.
 */
export const meansOfTransport: ShowBlockFunction<MeansOfTransport[]> = (
	anyOfTheseMeans,
) => ({ currentMeansOfTransport }) =>
	anyOfTheseMeans.some(
		(transportMethod) => transportMethod === currentMeansOfTransport,
	);

/**
 * Function that accepts an array of travel stages, and ensures that
 * the current applicable travel stage is present in this array.
 */
export const travelStage: ShowBlockFunction<TravelStage[]> = (
	anyOfTheseStages,
) => ({ currentTravelStage }) =>
	anyOfTheseStages.some((stage) => stage === currentTravelStage);

/**
 * Function that accept a number of days, ensuring that that Today date
 * is more or equal than minDays AFTER the travel toDate.
 *
 * Difference in days adds +1 since your first day at home (day 0), is
 * actually day 1 of your quarantaine.
 */
export const minDaysHome: ShowBlockFunction<number> = (minDays) => ({
	toDate,
}) => (toDate ? differenceInDays(new Date(), toDate) + 1 >= minDays : false);

/**
 * Function that accept a number of days, ensuring that that Today date
 * is not more than maxDays past the travel toDate.
 *
 * Difference in days adds +1 since your first day at home (day 0), is
 * actually day 1 of your quarantaine.
 */
export const maxDaysHome: ShowBlockFunction<number> = (maxDays) => ({
	toDate,
}) => (toDate ? differenceInDays(new Date(), toDate) + 1 <= maxDays : false);

/**
 * Function that accept a number of days, ensuring that that Today date
 * is more than minDays BEFORE the travel fromDate.
 */
export const minDaysBeforeFromDate: ShowBlockFunction<number> = (minDays) => ({
	fromDate,
}) => (fromDate ? differenceInDays(fromDate, new Date()) >= minDays : false);

/**
 * Function that ensures the current country is  a coronamelder country.
 */
export const coronaMelderCountry: ShowBlockFunction<boolean> = (bool) => ({
	coronaMelderCountry,
}) => coronaMelderCountry === bool;

/**
 * Function that checks ALL of the past transportation means apply to
 * the current country.
 */
export const travelRestriction: ShowBlockFunction<TransportRestrictions> = (
	allOfTheseMeans,
) => ({ transportRestrictions }) =>
	allOfTheseMeans.every(
		(transportType) =>
			transportRestrictions &&
			transportRestrictions.indexOf(transportType) > -1,
	);

export const beforeDate: ShowBlockFunction<Date> = (date) => ({ fromDate }) =>
	fromDate ? isBefore(fromDate, date) : false;

export const afterDate: ShowBlockFunction<Date> = (date) => ({ fromDate }) =>
	fromDate ? isAfter(fromDate, date) : false;
