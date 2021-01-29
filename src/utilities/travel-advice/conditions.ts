/**
 * @TODO: I still think these type names can be improved.
 * Suggestions welcome :)
 */

import { MeansOfTransport, TravelStage } from 'components/advice/AdviceContext';
import { RiskLevel, TransportRestrictions } from 'config/countries';
import { GetTravelSchemeContentBlocksParams } from './travel-advice';
import { isBefore, addDays, subDays } from 'date-fns';

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
 * is not more than maxDays past the travel toDate.
 */
export const maxDaysAfterToDate: ShowBlockFunction<number> = (maxDays) => ({
	toDate,
}) => (toDate ? isBefore(new Date(), addDays(toDate, maxDays)) : false);

/**
 * Function that accept a number of days, ensuring that that Today date
 * is not more than maxDays before the travel fromDate.
 */
export const maxDaysBeforeFromDate: ShowBlockFunction<number> = (maxDays) => ({
	fromDate,
}) => (fromDate ? isBefore(new Date(), subDays(fromDate, maxDays)) : false);

/**
 * Function that ensures the current country is a coronamelder country.
 */
export const coronaMelderCountry: ShowBlockFunction<boolean> = (bool) => ({
	coronaMelderCountry,
}) => coronaMelderCountry === bool;

/**
 * Function that ensures the current country has a certain transport restriction.
 */
export const hasTransportRestriction: ShowBlockFunction<TransportRestrictions> = (
	allOfTheseTransportRestrictions,
) => ({ transportRestrictions }) =>
	allOfTheseTransportRestrictions.every((transportMode) =>
		transportRestrictions?.includes(transportMode),
	);
