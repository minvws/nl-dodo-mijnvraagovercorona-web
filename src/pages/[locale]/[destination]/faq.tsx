/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { cartesianProduct } from 'utilities/pathUtils';
import { countries } from 'config/countries';
import { useDestination } from 'hooks/use-destination';
import MetaTags from 'components/meta/MetaTags';
import { FaqListComplete } from 'components/faq/FaqList';
import Feedback from 'components/feedback/Feedback';
import { Content, Page } from 'components/structure/Page';

interface FAQProps {
	destination: string;
}

const FAQ = ({ destination }: FAQProps) => {
	const country = useDestination(destination as string);

	return (
		<>
			<MetaTags
				title={`Veelgestelde vragen ${country?.fullName} | Quarantaine Reischeck | Rijksoverheid.nl`}
				description="Overzicht van veelgestelde vragen over quarantaine en reizen."
				url={`/${country?.slug}/faq`}
			/>

			<Page
				title="Veelgestelde vragen"
				showBackLink="result"
				illustrationUrl="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg"
				illustrationMobileUrl="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg"
			>
				<Content>
					<FaqListComplete country={country} />
					<Feedback />
				</Content>
			</Page>
		</>
	);
};

export interface FAQStaticProps {
	params: {
		destination: string;
		locale: 'nl' | 'en';
	};
}

export const getStaticProps = async ({ params }: FAQStaticProps) => {
	return {
		props: {
			destination: params.destination,
			locale: params.locale,
		},
	};
};

export const getStaticPaths = () => ({
	paths: cartesianProduct(
		countries.map((country) => `${country.slug}`),
		['nl', 'en'].map((locale) => `${locale}`),
	).map(([destination, locale]: string[]) => ({
		params: { destination, locale },
	})),
	fallback: false,
});

export default FAQ;
