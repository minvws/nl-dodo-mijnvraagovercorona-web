/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import type { Faqs } from 'components/faq';

import { getFaqsQuery } from 'utilities/sanity';
import { cartesianProduct } from 'utilities/pathUtils';
import { getExcludedFaqs } from 'utilities/faqs';

import { countries } from 'config/countries';

import { MetaTags } from 'components/meta';
import { FaqListComplete } from 'components/faq';
import { Feedback } from 'components/feedback';
import { Content, Page } from 'components/structure';

import { useTranslation } from 'hooks/translation';
import { useDestination } from 'hooks/use-destination';

interface FAQProps {
	destination: string;
	faqs: Faqs;
}

const FAQ = ({ destination, faqs }: FAQProps) => {
	const country = useDestination(destination as string);
	const { t_s } = useTranslation();

	return (
		<>
			<MetaTags
				title={`Veelgestelde vragen ${t_s(country!.slug)}`}
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
					<FaqListComplete faqs={faqs} />
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

export const getStaticProps = async ({
	params: { destination, locale },
}: FAQStaticProps) => {
	const { faqs, siteSettings } = await getFaqsQuery({
		locale,
		exclude: getExcludedFaqs({ destination }),
	});

	return {
		props: {
			destination,
			locale,
			siteSettings,
			faqs,
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
