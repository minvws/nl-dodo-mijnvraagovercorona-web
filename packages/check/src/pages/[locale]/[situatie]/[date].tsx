import { cartesianProduct } from '@quarantaine/common';
import { default as Situatie, getStaticProps } from './index';

import { getSituations } from 'utilities/situations';

export const getStaticPaths = async () => {
	const situations = await getSituations();

	const dates = [
		'1-dagen-geleden',
		'2-dagen-geleden',
		'3-dagen-geleden',
		'4-dagen-geleden',
		'5-dagen-geleden',
		'6-dagen-geleden',
		'7-dagen-geleden',
		'8-dagen-geleden',
		'9-dagen-geleden',
		'10-dagen-geleden',
		'geen-resultaat',
	];

	return {
		paths: cartesianProduct(
			situations,
			dates,
			['nl'].map((locale) => `${locale}`),
		).map(([situatie, date, locale]: string[]) => ({
			params: { situatie, locale, date },
		})),
		fallback: false,
	};
};

export { getStaticProps };

export default Situatie;
