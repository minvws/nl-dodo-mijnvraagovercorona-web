/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Container, Box } from 'theme-ui';
import { Page } from 'components/page';

import {
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
	Hero,
	Locales,
	Retain,
	Layer,
	TheSwitcher,
} from '@quarantaine/common';
import {
	getJouwSituatiePageNoMatchProjection,
	JouwSituatiePageNoMatchContent,
} from './jouw-situatie';
import { Folder, FolderProps } from 'components/molecules';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';

interface PageContent extends JouwSituatiePageNoMatchContent {
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
	folders: FolderProps[];
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

	// Only show first uitleg
	const uitleg = page.uitleg[0];

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
				skipPageSuffix
			/>

			<Page>
				<Hero title={page.header.title}>
					<Styled.p
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
					</Styled.p>
					<mark>Adviezen</mark>
				</Hero>

				<Layer>
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<TheSwitcher gap={['2rem', '4rem']}>
									{page.folders
										// if not translated, don't show
										.filter((folder) => folder.title)
										.map((folder) => (
											<Folder {...folder} key={folder.title} />
										))}
								</TheSwitcher>
							</Retain>
						</Box>
					</Container>
				</Layer>

				<Layer backgroundColor="headerBackground">
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<TheSwitcher gap={['2rem', '6.5rem']}>
								<mark>Hulp nodig</mark>
								<mark>Hulp nodig</mark>
							</TheSwitcher>
						</Box>
					</Container>
				</Layer>
			</Page>
		</>
	);
}

interface LandingStaticProps {
	params: { locale: Locales };
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

		"folders": folders[]{
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({ name: 'content', locale })},
			"image": "/images/sanity/" + image.asset->originalFilename,
			"cases": cases[]{
				${getLocaleProperty({ name: 'title', locale })},
				${getLocaleProperty({
					name: 'titleSuffix',
					locale,
				})},
				${getLocaleProperty({
					name: 'intro',
					locale,
				})},
				${getLocaleProperty({
					name: 'readMoreLabel',
					locale,
				})},
				"contentBlocks": contentBlocks[]{
					${getLocaleProperty({
						name: 'content',
						path: '^',
						locale,
					})},
					"situation": {
						${getLocaleProperty({
							name: 'situationLinkTitle',
							locale,
						})},
						"url": situationReference->url,
						"showDate": situationReference->showDate,
						"showExceptions": situationReference->showExceptions,
					}
				}
			}
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

	const jouwSituatiePageProjection = `{${getJouwSituatiePageNoMatchProjection(
		locale,
	)}}`;

	const { page: jouwSituatiePage } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'jouw-situatie-page',
			pageProjection: jouwSituatiePageProjection,
			locale,
		}),
	);

	return {
		props: {
			page: { ...page, ...jouwSituatiePage },
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
