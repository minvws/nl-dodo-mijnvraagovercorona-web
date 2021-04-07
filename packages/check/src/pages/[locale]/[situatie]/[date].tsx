import { cartesianProduct } from '@quarantaine/common';
import { default as Situatie, getStaticProps } from './index';

import { getSituations } from 'utilities/situations';

export const getStaticPaths = async () => {
	const situations = await getSituations();

	const paths = situations.map((situation) => {
		// Create an array with all the date slugs for this situation.
		const dates = Array.from({ length: situation.maxDays }).map(
			(_, index) => `${index + 1}-${index + 1 === 1 ? 'dag' : 'dagen'}-geleden`,
		);
		dates.push('geen-resultaat');

		// Create cartesion product for 1 situation.
		return cartesianProduct([situation.url], dates, ['nl']).map(
			([situatie, date, locale]: string[]) => ({
				params: { situatie, locale, date },
			}),
		);
	});

	return {
		paths: ([] as typeof paths[0]).concat(...paths),
		fallback: false,
	};
};

export { getStaticProps };

export default Situatie;
