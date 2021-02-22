/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import type { Faqs } from 'components/faq';

import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';
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
	page: {
		metaData: {
			title: string;
			description: string;
		};
		title: string;
		stages: {
			thuiskomst: string;
			tijdens: string;
			voorbereiding: string;
		};
		url: string;
	};
}

const FAQ = ({ destination, faqs, page }: FAQProps) => {
	const country = useDestination(destination as string);
	const { t_s } = useTranslation();

	return (
		<>
			<MetaTags
				title={page.metaData.title.replace('$$country', t_s(country!.slug))}
				description={page.metaData.description}
				url={page.url.replace('$$country', country!.slug)}
			/>

			<Page
				title={page.title}
				showBackLink="result"
				illustrationUrl="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg"
				illustrationMobileUrl="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg"
			>
				<Content>
					<FaqListComplete faqs={faqs} stages={page.stages} />
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
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		${getLocaleProperty({ name: 'title', locale })},
		"stages": {
			${getLocaleProperty({ name: 'thuiskomst', path: 'stages.thuiskomst', locale })},
			${getLocaleProperty({ name: 'tijdens', path: 'stages.tijdens', locale })},
			${getLocaleProperty({
				name: 'voorbereiding',
				path: 'stages.voorbereiding',
				locale,
			})},
		},
		url
	}`;
	const { page, faqs, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'faq-page',
			pageProjection,
			locale,
			faqs: {
				exclude: getExcludedFaqs({ destination }),
			},
		}),
	);

	return {
		props: {
			destination,
			locale,
			siteSettings,
			faqs,
			page,
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
