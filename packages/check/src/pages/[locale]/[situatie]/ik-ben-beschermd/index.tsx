/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';

import { Page } from 'components/page';

import {
	MetaTags,
	Hero,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	cartesianProduct,
	Content,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	pretitle: string;
	isBeschermdText: Object[];
	url: string;
}

interface IsBeschermdProps {
	currentSituation: any; // TODO
	locale: 'nl';
}

export default function IsBeschermd({
	currentSituation,
	locale,
}: IsBeschermdProps) {
	const page = useSanityPageContent<PageContent>();

	console.log('page', page);

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={page.url.replace('$$situatie', currentSituation.url)}
			/>

			<Page showRetryLink>
				<Hero
					title={page.header.title}
					titlePrefix={page.pretitle}
					illustrationUrl="/images/illustration-couch.svg"
				/>
				<Content>{page.isBeschermdText}</Content>
			</Page>
		</>
	);
}

type Situaties =
	| 'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten'
	| 'ik-kan-afstand-houden'
	| 'ik-ben-misschien-besmet'
	| 'ik-heb-een-coronamelder-melding-gekregen'
	| 'ik-kom-uit-een-risicogebied'
	| 'ik-heb-corona-met-klachten'
	| 'ik-heb-corona-zonder-klachten';

interface IsBeschermdStaticProps {
	params: { locale: 'nl' | 'en'; situatie: Situaties };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: IsBeschermdStaticProps) => {
	const situations = await getSituations();
	const currentSituation = situations.find(
		(situation) => situation.url === situatie,
	);

	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'title', path: `header.title`, locale })},
		},
		${getLocaleProperty({ name: 'pretitle', locale })},
		${getLocaleProperty({ name: 'isBeschermdText', locale })},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'check-ik-ben-beschermd-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			currentSituation,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = async () => {
	const situations = await getSituations();

	return {
		paths: cartesianProduct(
			situations
				.filter((situation) => situation.showProtected)
				.map((situation) => situation.url),
			['nl', 'en'].map((locale) => `${locale}`),
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
