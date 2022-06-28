/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import React from 'react';

import {
	Locales,
	MetaTags,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	Header,
	Layer,
	TheSidebar,
	BannerDataProtection,
	useSanitySiteSettings,
	Retain,
	getImage,
	SanityImageFullProps,
	ContentBlock,
} from '@quarantaine/common';

import {
	getSituationQuestionPageQuery,
	getSituationQuestions,
} from 'utilities/situations-flow';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	FormAnswersDate,
	FormAnswersAge,
	FormAnswersButtons,
	FormAnswersMultiple,
	FormAnswersMultipleProps,
	FormAnswersSingle,
	FormAnswersSingleProps,
	FormSubmitProps,
	MastheadFlow,
	mastheadMobileImageBlockSize,
} from 'components/molecules';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		content: Object[];
		image: SanityImageFullProps;
	};
	content: FormAnswersSingleProps['content'];
	answersMultiple: FormAnswersMultipleProps['answers'];
	showMore: {
		max: number;
		label: {
			this: string;
			that: string;
		};
	};
	answersSingle: FormAnswersSingleProps['answers'];
	ageInput: {
		label: string;
		placeholder: string;
	};
	steps: {
		current: number;
		total: number;
	};
	type: 'multiple' | 'single' | 'datepicker' | 'buttons' | 'age';
	buttons: FormSubmitProps['buttons'];
	slug: string;
}

export const Vraag = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();
	const url = `/situatie/${page.slug}`;

	const layerPaddingBlockStart =
		page.type === 'datepicker'
			? ['0']
			: [
					page.header.image && page.header.image.src
						? mastheadMobileImageBlockSize
						: '2rem',
					'3.75rem',
			  ];

	const asideOffset = page.type === 'datepicker' ? [0, '3.25rem'] : [0];

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={url}
			/>

			<Page noHeader>
				<MastheadFlow
					title={page.header.title}
					illustration={page.header.image}
					headerSlot={<Header noPadding />}
					noIllustrationMobile={page.type === 'datepicker'}
				>
					{page.header.content ? (
						<ContentBlock content={page.header.content} />
					) : null}
				</MastheadFlow>
				<Layer
					backgroundColor="white"
					paddingBlockStart={layerPaddingBlockStart}
				>
					<Container>
						<TheSidebar
							asideChildren={
								<BannerDataProtection content={siteSettings.privacy} />
							}
							asideOffset={asideOffset}
						>
							<Retain>
								{page.type === 'multiple' && page.answersMultiple ? (
									<FormAnswersMultiple
										answers={page.answersMultiple}
										buttons={page.buttons}
										showMoreLabel={page.showMore.label}
										limit={page.showMore.max}
										locale={locale}
										content={page.content}
									/>
								) : page.type === 'single' && page.answersSingle ? (
									<FormAnswersSingle
										answers={page.answersSingle}
										buttons={page.buttons}
										locale={locale}
										content={page.content}
									/>
								) : page.type === 'datepicker' ? (
									<FormAnswersDate buttons={page.buttons} locale={locale} />
								) : page.type === 'buttons' ? (
									<FormAnswersButtons
										buttons={page.buttons}
										locale={locale}
										content={page.content}
									/>
								) : page.type === 'age' ? (
									<FormAnswersAge
										buttons={page.buttons}
										locale={locale}
										placeholder={page.ageInput.placeholder}
										label={page.ageInput.label}
										content={page.content}
									/>
								) : null}
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type Question = { question: string };

export const getStaticPaths = async () => {
	const questions: Question[] = await getSituationQuestions();

	return {
		paths: questions.reduce(
			(paths: VraagStaticProps[], question: Question): VraagStaticProps[] => [
				...paths,
				...locales.map((locale) => ({ params: { ...question, locale } })),
			],
			[],
		),

		fallback: false,
	};
};

interface VraagStaticProps {
	params: { question: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { question, locale },
}: VraagStaticProps) => {
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
			${getLocaleProperty({
				name: 'content',
				path: `header.content`,
				locale,
				block: true,
			})},
			${getImage({ name: 'image', path: `header.image`, full: true })},
		},
		type,
		"content": {
			${getLocaleProperty({
				name: 'contentPrimary',
				path: `contentReference->content.contentPrimary`,
				locale,
				block: true,
			})},
			${getImage({
				name: 'imagePrimary',
				path: `contentReference->content.imagePrimary`,
			})},
			${getLocaleProperty({
				name: 'contentSecondary',
				path: `contentReference->content.contentSecondary`,
				locale,
				block: true,
			})},
			${getImage({
				name: 'imageSecondary',
				path: `contentReference->content.imageSecondary`,
			})},
		},
		"answersSingle": answersSingle[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
			"next": select(
				next->_type == "situation-question-document" => 'situatie/' + next->slug.current,
				next->_type == "situation-result-document" => 'advies/' + next->slug.current,
			),
		},
		"answersMultiple": answersMultiple[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
		},
		"ageInput": {
			${getLocaleProperty({ name: 'label', path: 'ageInput.label', locale })},
			${getLocaleProperty({
				name: 'placeholder',
				path: 'ageInput.placeholder',
				locale,
			})},
		},
		"showMore": {
			"max": showMore.max,
			"label": {
				${getLocaleProperty({
					name: 'this',
					path: 'showMore.label.this',
					locale,
				})},
				${getLocaleProperty({
					name: 'that',
					path: 'showMore.label.that',
					locale,
				})},
			}
		},
		"buttons": buttons[]{
			_key,
			${getLocaleProperty({ name: 'text', locale })},
			standard,
			"next": select(
				next->_type == "situation-question-document" => 'situatie/' + next->slug.current,
				next->_type == "situation-result-document" => 'advies/' + next->slug.current,
			),
		},
		"slug": slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getSituationQuestionPageQuery({
			pageProjection,
			locale,
			question,
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

export default Vraag;
