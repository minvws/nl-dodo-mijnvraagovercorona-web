import { cartesianProduct } from '@quarantaine/common';
import { situationsJij, situationsOther } from '../jouw-situatie';
import { default as Situatie, getStaticProps } from './index';

export { getStaticProps };
export default Situatie;

export const getStaticPaths = () => {
	// @TODO: Add paths from CMS here.
	const situaties = [...situationsJij, ...situationsOther]
		.filter((s) => s.ctas[0]?.name)
		.map((s) => s.ctas[0].name);

	const dates = [
		'gisteren',
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
			situaties,
			dates,
			['nl', 'en'].map((locale) => `${locale}`),
		).map(([situatie, date, locale]: string[]) => ({
			params: { situatie, locale, date },
		})),
		fallback: false,
	};
};
