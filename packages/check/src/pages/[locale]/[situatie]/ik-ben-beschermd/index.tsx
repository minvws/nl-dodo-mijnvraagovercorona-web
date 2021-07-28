/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import React from 'react';

import { Page } from 'components/page';

import {
	MetaTags,
	Hero,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	cartesianProduct,
	Content,
	getSituationPageQuery,
	ContentBlock,
	SchemeBlock,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';
import { GGDSpecialInstructions } from 'components/ggd-special-instructions';
interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	pretitle: string;
	url: string;
	showProtected?: boolean;
	beschermdTitle: string;
	beschermdText: Object[];
	showDate?: boolean;
}

interface IsBeschermdProps {
	locale: 'nl';
}

export default function IsBeschermd({ locale }: IsBeschermdProps) {
	const page = useSanityPageContent<PageContent>();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/${page.url}`}
			/>

			<Page showRetryLink>
				<Hero
					title={page.beschermdTitle}
					titlePrefix={page.pretitle}
					illustrationUrl="/images/illustration-door.svg"
				/>
				<Content>
					<section sx={{ paddingRight: [, '165px'] }}>
						<SchemeBlock>
							<ContentBlock content={page.beschermdText} />
						</SchemeBlock>
						<Box sx={{ mt: 'box' }}>
							<GGDSpecialInstructions />
						</Box>
					</section>
				</Content>
			</Page>
		</>
	);
}

interface IsBeschermdStaticProps {
	params: { locale: 'nl' | 'en'; situatie: string };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: IsBeschermdStaticProps) => {
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
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
		},
		${getLocaleProperty({ name: 'pretitle', locale })},
		${getLocaleProperty({ name: 'beschermdTitle', locale })},
		${getLocaleProperty({ name: 'beschermdText', locale })},
		url,
		showProtected,
    showDate
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getSituationPageQuery({
			type: 'situation-document',
			situationSlug: situatie,
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
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
