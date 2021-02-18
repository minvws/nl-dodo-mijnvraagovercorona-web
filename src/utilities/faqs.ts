import { TravelStage } from 'components/advice/AdviceContext';
import { Faqs } from 'components/faq';
import { Country, RiskLevel } from 'config/countries';
import { useDestination } from 'hooks/use-destination';

export const isNegativeTestDeclarationNeeded = (country: Country | null) =>
	country?.riskLevel === RiskLevel?.C_VEILIGE_LIJST ||
	country?.riskLevel === RiskLevel?.D_EU_INREISVERBOD;

export const getExcludedFaqs = ({ destination }: { destination: string }) => {
	const country = useDestination(destination as string);
	const showNegativeTestDeclaration = isNegativeTestDeclarationNeeded(country);

	return showNegativeTestDeclaration
		? ['howToGetTestresult', 'whyNegativeTest']
		: ['howToGetTestresultAndDeclaration', 'whyNegativeTestAndDeclaration'];
};

export const getRequiredFaqs = ({
	stage,
	destination,
}: {
	stage: TravelStage;
	destination: string;
}) => {
	const country = useDestination(destination as string);
	const showNegativeTestDeclaration = isNegativeTestDeclarationNeeded(country);

	const requiredFaqs = {
		'voor-vertrek': [
			'whatNecessary',
			'whyRisk',
			'whyQuarantine',
			'whatIsQuarantine',
			!showNegativeTestDeclaration
				? 'whyNegativeTest'
				: 'whyNegativeTestAndDeclaration',
		],
		'tijdens-je-reis': [
			!showNegativeTestDeclaration
				? 'whyNegativeTest'
				: 'whyNegativeTestAndDeclaration',
			'whichRequirements',
			!showNegativeTestDeclaration
				? 'howToGetTestresult'
				: 'howToGetTestresultAndDeclaration',
			'whatToDoPositive',
			'whyQuarantine',
		],
		'na-thuiskomst': [
			'whyTenDays',
			'negativeTestQuarantaine',
			'canQuarantaineBeShortened',
			'testEarlier',
			'rulesVacination',
		],
	};

	return requiredFaqs[stage];
};

export const orderByReferences = ({
	faqs,
	references,
}: {
	faqs: Faqs;
	references: string[];
}) =>
	references.map((reference) =>
		faqs.find((faq) => faq.reference === reference),
	);
