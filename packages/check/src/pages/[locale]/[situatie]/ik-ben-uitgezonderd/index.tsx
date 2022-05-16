/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import React, { useContext } from 'react';

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
	Locales,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';
import { GGDSpecialInstructions } from 'components/ggd-special-instructions';
import { locales } from 'content/general-content';
import { LinkBack } from 'components/link-back';
import GlobalContext from 'utilities/global-context';
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
	showExceptions?: boolean;
	uitgezonderdTitle: string;
	uitgezonderdText: Object[];
	showDate?: boolean;
}

export default function IsUitgezonderd() {
	const page = useSanityPageContent<PageContent>();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/${page.url}`}
			/>

			<Page>
				<Hero
					title={page.uitgezonderdTitle}
					titlePrefix={page.pretitle}
					illustrationUrl="/images/illustration-door.svg"
				>
					<LinkBack href="" variant="restart" />
				</Hero>
				<Content>
					<section sx={{ paddingRight: [, '165px'] }}>
						<SchemeBlock>
							<ContentBlock content={page.uitgezonderdText} />
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

interface IsUitgezonderdStaticProps {
	params: { locale: Locales; situatie: string };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: IsUitgezonderdStaticProps) => {
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
		${getLocaleProperty({ name: 'uitgezonderdTitle', locale })},
		${getLocaleProperty({ name: 'uitgezonderdText', locale, block: true })},
		url,
		showExceptions,
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
				.filter((situation) => situation.showExceptions)
				.map((situation) => situation.url),
			locales,
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
