/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';

import {
	Locales,
	MetaTags,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	Header,
	getImage,
	SanityImageFullProps,
	ContentBlock,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { Masthead } from 'components/molecules';
import { getTipPageQuery, getTips } from 'utilities/tips';

interface PageContent {
	metaData: {
		title: string;
		description: string;
		socialShareImage: SanityImageFullProps;
	};
	header: {
		title: string;
		content: Array<Object>;
		image: SanityImageFullProps;
	};
	slug: string;
}

export const Tip = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();
	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				shareImage={page.metaData.socialShareImage}
				url={`/${page.slug}`}
				skipPageSuffix
			/>
			<Page noHeader>
				<Masthead
					headerSlot={<Header transparent noPadding />}
					title={page.header.title}
					illustration={page.header.image}
					variant="highlight"
				>
					<ContentBlock content={page.header.content} />
				</Masthead>
				<mark>Tips content</mark>
			</Page>
		</>
	);
};

type TipProps = { tip: string };

export const getStaticPaths = async () => {
	const tips: TipProps[] = await getTips();

	return {
		paths: tips.reduce(
			(paths: TipStaticProps[], tip: TipProps): TipStaticProps[] => [
				...paths,
				...locales.map((locale) => ({
					params: { ...tip, locale },
				})),
			],
			[],
		),

		fallback: false,
	};
};

interface TipStaticProps {
	params: { tip: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { tip, locale },
}: TipStaticProps) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
			${getImage({
				name: 'socialShareImage',
				path: 'metaData.socialShareImage',
				full: true,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${getImage({ name: 'image', path: 'header.image', full: true })},
		},
		"slug": slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getTipPageQuery({
			pageProjection,
			locale,
			tip,
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

export default Tip;
