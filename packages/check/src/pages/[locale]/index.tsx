/** @jsx jsx */
import React, { useContext, useEffect } from 'react';
import { jsx, Styled, Container, Box } from 'theme-ui';
import { Page } from 'components/page';

import {
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	Locales,
	Retain,
	Layer,
	TheSwitcher,
	TheSwitcherItem,
	Header,
	Stack,
	TheThirds,
} from '@quarantaine/common';
import {
	getJouwSituatiePageNoMatchProjection,
	JouwSituatiePageNoMatchContent,
} from './jouw-situatie';
import {
	Folder,
	FolderProps,
	HulpPanel,
	FeedbackPanel,
	Masthead,
	AdviceList,
	AdviceProps,
} from 'components/molecules';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import GlobalContext from 'utilities/global-context';

export interface PageContent extends JouwSituatiePageNoMatchContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		currentSituation: string;
		measuresTitle: string;
		measuresText: string;
		adviceTitle: string;
		advice: AdviceProps[];
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
	help: {
		title: string;
		openingHours: string;
		question: string;
	};
	feedback: {
		title: string;
		button: string;
	};
	url: string;
}

export default function LandingPage() {
	const page = useSanityPageContent<PageContent>();
	const { startPoint, setStartPoint } = useContext(GlobalContext);

	useEffect(() => {
		setStartPoint && setStartPoint('');
	}, []);

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
				skipPageSuffix
			/>

			<Page noHeader>
				<Masthead
					headerSlot={<Header transparent noPadding />}
					title={page.header.title}
					chapeau={page.header.chapeau}
				>
					<Styled.p>{page.header.subtitle}</Styled.p>
				</Masthead>

				<Layer backgroundColor="headerBackground" pullUpBy="2rem">
					<Container>
						<Box
							sx={{
								paddingX: ['mobilePadding', 'tabletPadding', 0],
							}}
						>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<Stack>
									<Styled.h2>{page.header.currentSituation}</Styled.h2>
									<TheThirds
										asideChildren={
											<Stack spacing={['0.5rem']}>
												<Styled.h3>{page.header.measuresTitle}</Styled.h3>
												<Styled.p>{page.header.measuresText}</Styled.p>
											</Stack>
										}
									>
										<Stack spacing={['0.5rem']}>
											<Styled.h3>{page.header.adviceTitle}</Styled.h3>
											<AdviceList advices={page.header.advice} />
										</Stack>
									</TheThirds>
								</Stack>
							</Retain>
						</Box>
					</Container>
				</Layer>

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
							<TheSwitcher gap={['4rem', '4rem']}>
								<TheSwitcherItem blockAlign="center">
									<FeedbackPanel />
								</TheSwitcherItem>
								<TheSwitcherItem blockAlign="center">
									<HulpPanel />
								</TheSwitcherItem>
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
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			${getLocaleProperty({ name: 'chapeau', path: 'header.chapeau', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({
				name: 'currentSituation',
				path: 'header.currentSituation',
				locale,
			})},
			${getLocaleProperty({
				name: 'measuresTitle',
				path: 'header.measuresTitle',
				locale,
			})},
			${getLocaleProperty({
				name: 'measuresText',
				path: 'header.measuresText',
				locale,
			})},
			${getLocaleProperty({
				name: 'adviceTitle',
				path: 'header.adviceTitle',
				locale,
			})},
			"advice": header.advice[]{
				${getLocaleProperty({ name: 'title', locale })},
				${getLocaleProperty({ name: 'subtitle', locale })},
				"icon": "/images/sanity/" + icon.asset->originalFilename,
			}
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
		"help": {
			${getLocaleProperty({ name: 'title', path: 'help.title', locale })},
			${getLocaleProperty({ name: 'question', path: 'help.question', locale })},
			${getLocaleProperty({
				name: 'openingHours',
				path: 'help.openingHours',
				locale,
			})},
		},
		"feedback": {
			${getLocaleProperty({ name: 'title', path: 'feedback.title', locale })},
			${getLocaleProperty({ name: 'button', path: 'feedback.button', locale })},
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
