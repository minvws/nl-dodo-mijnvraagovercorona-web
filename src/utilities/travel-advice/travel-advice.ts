import { RiskLevel } from 'config/countries';
import {
	MeansOfTransport,
	TravelStage,
} from '../../components/advice/AdviceContext';
import { travelAdviceConfiguration } from 'config/travelscheme-content-conditions';
import { EvaluateBooleanMethod } from './conditions';

/**
 * All options passed into each function to decide
 * whether a block should be shown or not.
 *
 * See config/travelscheme-content-conditions.ts for more
 * context about how this is used. This will probably help
 * you understand the types and methods in this file quicker ;)
 */
export interface GetTravelSchemeContentBlocksParams {
	currentCategory?: RiskLevel;
	currentMeansOfTransport?: MeansOfTransport;
	currentTravelStage?: TravelStage;
	fromDate?: Date;
	toDate?: Date;
	coronaMelderCountry?: boolean;
}

/**
 * Type that results in an enum of all different advice
 * configuration properties.
 */
type AdviceConfigBlocks = keyof typeof travelAdviceConfiguration;

/**
 * Iterates over all conditions and resolves them to 1 single boolean.
 * ALL rows must resolve to true for it to be visible.
 */
const evaluateAllConditionsToSingleBoolean = (
	fns: EvaluateBooleanMethod[],
	currentValues: GetTravelSchemeContentBlocksParams,
) => fns.map((fn) => fn(currentValues)).every((bool) => bool === true);

/**
 * Interates over all arrays in the travelAdviceConfiguration and
 * replaces all properties with 1 single boolean to either show or hide the block.
 */
export const getTravelSchemeContentBlocks = (
	currentValues: GetTravelSchemeContentBlocksParams,
) => {
	return (Object.keys(travelAdviceConfiguration) as Array<
		keyof typeof travelAdviceConfiguration
	>).reduce(
		(config, currentProperty) => {
			return {
				...config,
				[currentProperty]: evaluateAllConditionsToSingleBoolean(
					travelAdviceConfiguration[currentProperty],
					currentValues,
				),
			};
		},
		{} as {
			[key in AdviceConfigBlocks]: boolean;
		},
	);
};
