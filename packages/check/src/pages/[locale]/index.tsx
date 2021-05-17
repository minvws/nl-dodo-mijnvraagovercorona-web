/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';

import { Page } from 'components/page';

import {
	Link,
	QuickLinks,
	SectionInformational,
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
	Content,
	Hero,
} from '@quarantaine/common';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		button: string;
		pretitle: string;
		subtitle: string;
		title: string;
	};
	uitleg: {
		description: string;
		image: string;
		pretitle: string;
		title: string;
		linklist: {
			id: string;
			usp: string;
		};
	}[];
	url: string;
}

export default function LandingPage() {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
				skipPageSuffix
			/>

			<Page>
				<Hero title={page.header.title} titlePrefix={page.header.pretitle}>
					<h2
						sx={{
							fontWeight: 'light',
							width: ['80%', '549px'],
							fontSize: '26px',
							lineHeight: ['30px', '36px'],
							marginTop: 0,
							marginBottom: ['18px'],
							color: 'roHighlight',
						}}
					>
						{page.header.subtitle}
					</h2>
					<Link styledAs="button" href="/jouw-situatie">
						{page.header.button}
					</Link>
				</Hero>

				<Content>
					<QuickLinks>
						{page.uitleg.map(
							(item) =>
								item.linklist.id &&
								item.linklist.usp && (
									<Link
										href={`#${item.linklist.id}`}
										key={item.linklist.id}
										fontWeight="bold"
									>
										{item.linklist.usp}
									</Link>
								),
						)}

						<Link
							href={`#${siteSettings.privacy.id}`}
							sx={{ display: ['block', 'none'] }}
							fontWeight="bold"
						>
							{siteSettings.privacy.usp}
						</Link>
					</QuickLinks>

					{page.uitleg.map((item, index) => (
						<SectionInformational
							imageUrl={item.image}
							imageAlignment={index % 2 === 0 ? 'right' : 'left'}
							key={item.title}
							id={item.linklist.id}
							chapeau={item.pretitle}
							title={item.title}
						>
							<Styled.p>{item.description}</Styled.p>
						</SectionInformational>
					))}
				</Content>
			</Page>
		</>
	);
}

interface LandingStaticProps {
	params: { locale: 'nl' | 'en' };
}

export const getStaticProps = async ({
	params: { locale },
}: LandingStaticProps) => {
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
			${getLocaleProperty({ name: 'button', path: 'header.button', locale })},
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		"uitleg": uitleg[]{
			"image": "/images/sanity/" + image.asset->originalFilename,
			${getLocaleProperty({ name: 'description', locale })},
			${getLocaleProperty({ name: 'pretitle', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			"linklist": {
				${getLocaleProperty({ name: 'id', path: 'linklist.id', locale })},
				${getLocaleProperty({ name: 'usp', path: 'linklist.usp', locale })},
			},
		},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'check-landing-page',
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

export const getStaticPaths = () => ({
	paths: ['nl', 'en'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
