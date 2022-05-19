/** @jsx jsx */
import { Image, Styled, Box, jsx, Container } from 'theme-ui';
import React, { useState } from 'react';

import {
	Locales,
	Link,
	StyledLinkPropsAsAnchor,
	MetaTags,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	ContentBlock,
	Feedback,
	getFeedbackUrl,
	useSanitySiteSettings,
	Header,
	Layer,
	Retain,
	Stack,
	Story,
	LayoutFit,
	getImage,
} from '@quarantaine/common';

import { getTopicResultPageQuery, getTopicResults } from 'utilities/topics';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { MastheadFlow } from 'components/molecules';
import { LinkBack } from 'components/link-back';

interface ButtonProps {
	external: boolean;
	href: string;
	label: string;
	variant: StyledLinkPropsAsAnchor['styledAs'];
}

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	content: {
		image: string;
		title: string;
		button: string;
		href: string;
		content: Object[];
	};
	stories: {
		chapeau: string;
		title: string;
		content: Object[];
		image: string;
		button: {
			href: string;
			label: string;
		};
		buttons: ButtonProps[];
	}[];
	topic: string;
	slug: string;
}

export const Resultaat = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/resultaat/${page.topic}/${page.slug}`}
			/>

			<Page noHeader>
				<MastheadFlow
					title={page.header.title}
					headerSlot={
						<Header
							noPadding
							linkBackSlot={<LinkBack href="#onderwerpen" variant="restart" />}
						/>
					}
				/>

				<Layer backgroundColor="white">
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Stack spacing={['5rem']}>
								{page.stories.map((story, index) => (
									<Story
										media={
											<Image
												src={story.image}
												alt=""
												sx={{
													display: 'block',
													inlineSize: ['32rem'],
													maxInlineSize: ['14rem', '100%'],
													marginInlineStart: 'auto',
													marginInlineEnd: 'auto',
												}}
											/>
										}
										mediaAlignment={index % 2 === 0 ? 'end' : 'start'}
										key={story.title}
										chapeau={story.chapeau}
										title={story.title}
									>
										<ContentBlock content={story.content} />
										{story.buttons ? (
											<LayoutFit>
												{story.buttons.map((button) => (
													<Link
														key={button.label}
														styledAs={button.variant}
														href={button.href}
														external={button.external}
													>
														{button.label}
													</Link>
												))}
											</LayoutFit>
										) : null}
									</Story>
								))}
							</Stack>
							<Retain>
								<Feedback
									name="Onderwerp Resultaat"
									feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
										source: 'topic-result',
										topic: page.topic,
										result: page.slug,
									})}
								/>
							</Retain>
						</Box>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type Result = { result: string; topic: string };

export const getStaticPaths = async () => {
	const results: Result[] = await getTopicResults();

	return {
		paths: results.reduce(
			(
				paths: ResultaatStaticProps[],
				result: Result,
			): ResultaatStaticProps[] => [
				...paths,
				...locales.map((locale) => ({ params: { ...result, locale } })),
			],
			[],
		),

		fallback: false,
	};
};

interface ResultaatStaticProps {
	params: { result: string; topic: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { result, topic, locale },
}: ResultaatStaticProps) => {
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
		"content": {
			${getImage({ name: 'image', path: 'content.image' })},
			${getLocaleProperty({ name: 'title', path: `content.title`, locale })},
			${getLocaleProperty({ name: 'content', path: `content.content`, locale })},
			${getLocaleProperty({ name: 'href', path: `content.href`, locale })},
			${getLocaleProperty({ name: 'button', path: `content.button`, locale })},
		},
		"stories": stories[]{
			${getLocaleProperty({ name: 'chapeau', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({ name: 'content', locale, block: true })},
			"button": {
				${getLocaleProperty({ name: 'label', path: 'button.label', locale })},
				${getLocaleProperty({ name: 'href', path: 'button.href', locale })},
			},
			"buttons": buttons[]{
				${getLocaleProperty({ name: 'label', locale })},
				${getLocaleProperty({ name: 'href', locale })},
				external,
				variant,
			},
			${getImage({ name: 'image' })},
		},
		"slug": slug.current,
		"topic": topic->slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getTopicResultPageQuery({
			pageProjection,
			locale,
			result,
			topic,
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

export default Resultaat;
